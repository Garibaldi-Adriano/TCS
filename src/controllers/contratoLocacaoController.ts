import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import { ErrorRequest } from "../utils/TratamentoErros";
import { manutencao } from "../models/manutencaoModel";
import { veiculo } from "../models/veiculoModel";
import { ocorrencia } from "../models/ocorrenciaModel";

const prisma = new PrismaClient();

// Listar todos os contratos de locação
export const getAllContratoLocacoes = async (req: Request, res: Response) => {
  try {
    const contratos = await prisma.contratoLocacao.findMany({
      include: {
        ocorrencias: true,
      },
    });
    res.status(200).json(contratos);
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

// Obter um contrato de locação pelo ID
export const getContratoLocacaoById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const contrato = await prisma.contratoLocacao.findUnique({
      where: { id: Number(id) },
      include: {
        ocorrencias: true,
      },
    });

    if (!contrato) {
      res.status(404).json({ error: "Contrato de locação não encontrado" });
    } else {
      res.status(200).json(contrato);
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

// Criar um novo contrato de locação
export const createContratoLocacao = async (req: Request, res: Response) => {
  const { dataLocacao, dataDevolucao, valorCaucao, valorTotal, status, veiculoId } = req.body;

  if (!dataLocacao || !dataDevolucao || !valorCaucao || !valorTotal || !status || !veiculoId) {
    res.status(401).json({ message: "Parametros invalidos. Necessário informar: dataLocacao, dataDevolucao, valorCaucao, valorTotal, status e veiculoId." });
  }

  try {
    const contrato = await prisma.contratoLocacao.create({
      data: {
        dataLocacao: new Date(dataLocacao),
        dataDevolucao: new Date(dataDevolucao),
        valorCaucao,
        valorTotal,
        status
      },
      include: {
        veiculos: true
      }
    });
    res.status(201).json(contrato);
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
// Atualizar um contrato de locação
export const updateContratoLocacao = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { dataLocacao, dataDevolucao, valorCaucao, valorTotal, status } = req.body;

  if (!dataLocacao || !dataDevolucao || !valorCaucao || !valorTotal || !status) {
    res.status(401).json({ message: "Parametros invalidos. Necessário informar: dataLocacao, dataDevolucao, valorCaucao, valorTotal, e o status." });
  }

  try {
    const contrato = await prisma.contratoLocacao.update({
      where: { id: Number(id) },
      data: {
        dataLocacao: new Date(dataLocacao),
        dataDevolucao: new Date(dataDevolucao),
        valorCaucao,
        valorTotal,
        status,
        ocorrencias: {
          upsert: ocorrencia.map((ocorrencia: any) => ({
            where: { id: ocorrencia.id },
            update: {
              descricao: ocorrencia.descricao,
              dataOcorrencia: ocorrencia.dataOcorrencia,
              valorOcorrencia: ocorrencia.valorOcorrencia,
            },
            create: {
              descricao: ocorrencia.descricao,
              dataOcorrencia: ocorrencia.dataOcorrencia,
              valorOcorrencia: ocorrencia.valorOcorrencia,
            },
          })),
        },
      },
    });

    res.status(200).json(contrato);
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

// Deletar um contrato de locação
export const deleteContratoLocacao = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.contratoLocacao.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({ message: "Contrato de locação deletado com sucesso" });
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
