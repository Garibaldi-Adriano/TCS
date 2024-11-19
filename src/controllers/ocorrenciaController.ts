import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import { ErrorRequest } from "../utils/TratamentoErros";

const prisma = new PrismaClient();

// Listar todos os ocorrencias
export const getAllOcorrencias = async (req: Request, res: Response) => {
  try {
    const ocorrencias = await prisma.ocorrencia.findMany();
    res.status(200).json(ocorrencias);
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

// Obter um ocorrencia pelo ID
export const getOcorrenciaById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const ocorrencia = await prisma.ocorrencia.findUnique({
      where: { id: Number(id) },
    });

    if (!ocorrencia) {
      res.status(404).json({ error: "Ocorrencia não encontrada." });
    } else {
      res.status(200).json(ocorrencia);
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

// Criar um nova ocorrencia
export const createOcorrencia = async (req: Request, res: Response) => {
  const { descricao, dataOcorrencia, valorOcorrencia, contratoId } = req.body;

  if (!descricao || !dataOcorrencia || !valorOcorrencia || !contratoId) {
    res.status(401).json({ message: "Parametros invalidos. Necessário informar: descricao, dataOcorrencia, valorOcorrencia e o contratoId." });
  }

  try {
    const ocorrencia = await prisma.ocorrencia.create({
      data: {
        dataOcorrencia: new Date(dataOcorrencia),
        valorOcorrencia,
        descricao,
        contratoId,
      },
    });
    res.status(201).json(ocorrencia);
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

// Atualizar uma ocorrencia
export const updateOcorrencia = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { dataOcorrencia, valorOcorrencia, descricao, contratoId } = req.body;

  if (!dataOcorrencia || !valorOcorrencia || !descricao || !contratoId) {
    res.status(401).json({ message: "Parametros invalidos. Necessário informar: dataOcorrencia, valorOcorrencia, descricao e o contratoId." });
  }

  try {
    const ocorrencia = await prisma.ocorrencia.update({
      where: { id: Number(id) },
      data: {
        dataOcorrencia: new Date(dataOcorrencia),
        valorOcorrencia,
        descricao,
        contratoId: contratoId,
      },
    });

    res.status(200).json(ocorrencia);
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

// Deletar uma ocorrencia
export const deleteOcorrencia = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.ocorrencia.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({ message: "Ocorrencia deletada com sucesso" });
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
