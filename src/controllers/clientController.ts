import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import { ErrorRequest } from "../utils/TratamentoErros";

const prisma = new PrismaClient();

export const getAllClientes = async (req: Request, res: Response) => {
  try {
    const clientes = await prisma.cliente.findMany({
        orderBy: { nomeCompleto: 'asc' },
        include: {
          contratos: {
            include: {
              contrato: true
            }
          }
        }
      });
    res.status(200).json(clientes);
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

export const getClienteById = async (req: Request, res: Response) => {
    const { id } = req.params;
  
    try {
      const cliente = await prisma.cliente.findUnique({
        where: { id: Number(id) },
        include: {
          contratos: {
            include: {
              contrato: true
            }
          }
        }
      });
  
      if (!cliente) {
        return res.status(404).json({ error: "Cliente não encontrado" });
      }
      res.status(200).json(cliente);
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

export const createCliente = async (req: Request, res: Response) => {
  const { 
    nomeCompleto, cpf, email, telefone, cep, endereco, 
    numero, complemento, bairro, cidade, estado 
  } = req.body;

  if (!nomeCompleto || !cpf || !email || !telefone || !cep || !endereco || 
      !numero || !bairro || !cidade || !estado) {
    return res.status(400).json({ 
      message: "Todos os campos são obrigatórios exceto complemento." 
    });
  }

  try {
    const cliente = await prisma.cliente.create({
      data: {
        nomeCompleto,
        cpf,
        email,
        telefone,
        cep,
        endereco,
        numero,
        complemento,
        bairro,
        cidade,
        estado
      },
    });
    res.status(201).json(cliente);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return res.status(409).json({
          error: {
            message: "CPF ou email já cadastrado",
            field: error.meta?.target,
          },
        });
      }
      res.status(409).json({
        error: {
          message: ErrorRequest.errorRequest(error.code),
          field: error.meta,
        },
      });
    }
  }
};

export const updateCliente = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { 
    nomeCompleto, cpf, email, telefone, cep, endereco, 
    numero, complemento, bairro, cidade, estado 
  } = req.body;

  if (!nomeCompleto || !cpf || !email || !telefone || !cep || !endereco || 
      !numero || !bairro || !cidade || !estado) {
    return res.status(400).json({ 
      message: "Todos os campos são obrigatórios exceto complemento." 
    });
  }

  try {
    const cliente = await prisma.cliente.update({
      where: { id: Number(id) },
      data: {
        nomeCompleto,
        cpf,
        email,
        telefone,
        cep,
        endereco,
        numero,
        complemento,
        bairro,
        cidade,
        estado
      },
    });
    res.status(200).json(cliente);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return res.status(409).json({
          error: {
            message: "CPF ou email já cadastrado",
            field: error.meta?.target,
          },
        });
      }
      res.status(409).json({
        error: {
          message: ErrorRequest.errorRequest(error.code),
          field: error.meta,
        },
      });
    }
  }
};

export const deleteCliente = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.cliente.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({ message: "Cliente deletado com sucesso" });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return res.status(404).json({
          error: {
            message: "Cliente não encontrado",
          },
        });
      }
      res.status(409).json({
        error: {
          message: ErrorRequest.errorRequest(error.code),
          field: error.meta,
        },
      });
    }
  }
};