import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import { ErrorRequest } from "../utils/TratamentoErros";

const prisma = new PrismaClient();

// Listar todos os pagamentos
export const getAllPagamentos = async (req: Request, res: Response) => {
  try {
    const pagamentos = await prisma.pagamento.findMany();
    res.status(200).json(pagamentos);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.code);
      res.status(409).json({
        error: {
          message: ErrorRequest.errorRequest(error.code),
          field: error.meta,
        },
      });
    }
  }
};

// Obter um pagamento pelo ID
export const getPagamentoById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const pagamento = await prisma.pagamento.findUnique({
      where: { id: Number(id) },
    });

    if (!pagamento) {
      res.status(404).json({ error: "Pagamento não encontrado" });
    } else {
      res.status(200).json(pagamento);
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.code);
      res.status(409).json({
        error: {
          message: ErrorRequest.errorRequest(error.code),
          field: error.meta,
        },
      });
    }
  }
};

// Criar um novo pagamento
export const createPagamento = async (req: Request, res: Response) => {
  const { data, valorPago, formaPagamento, contrato } = req.body;

  if (!data || !valorPago || !formaPagamento || !contrato) {
    res.status(401).json({ message: "Parametros invalidos. Necessário informar: data, valorPago, formaPagamento e o contrato." });
  }

  try {
    const pagamento = await prisma.pagamento.create({
      data: {
        data: new Date(data),
        valorPago,
        formaPagamento,
        contrato: {
          create: contrato,
        },
      },
    });
    res.status(201).json(pagamento);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.code);
      res.status(409).json({
        error: {
          message: ErrorRequest.errorRequest(error.code),
          field: error.meta,
        },
      });
    }
  }
};

// Atualizar um pagamento
export const updatePagamento = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { data, valorPago, formaPagamento, contrato } = req.body;

  if (!data || !valorPago || !formaPagamento || !contrato) {
    res.status(401).json({ message: "Parametros invalidos. Necessário informar: data, valorPago, formaPagamento e o contrato." });
  }

  try {
    const pagamento = await prisma.pagamento.update({
      where: { id: Number(id) },
      data: {
        data: new Date(data),
        valorPago,
        formaPagamento,
        contrato: {
          upsert: {
            where: { id: contrato.id },
            update: {
              dataLocacao: contrato.dataLocacao,
              dataDevolucao: contrato.dataDevolucao,
              valorCaucao: contrato.valorCaucao,
              valorTotal: contrato.valorTotal,
              status: contrato.status,
            },
            create: {
              dataLocacao: contrato.dataLocacao,
              dataDevolucao: contrato.dataDevolucao,
              valorCaucao: contrato.valorCaucao,
              valorTotal: contrato.valorTotal,
              status: contrato.status,
            },
          },
        },
      },
    });

    res.status(200).json(pagamento);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.code);
      res.status(409).json({
        error: {
          message: ErrorRequest.errorRequest(error.code),
          field: error.meta,
        },
      });
    }
  }
};

// Deletar um pagamento
export const deletePagamento = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.pagamento.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({ message: "Pagamento deletado com sucesso" });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.code);
      res.status(409).json({
        error: {
          message: ErrorRequest.errorRequest(error.code),
          field: error.meta,
        },
      });
    }
  }
};
