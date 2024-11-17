import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import { ErrorRequest } from "../utils/TratamentoErros";

const prisma = new PrismaClient();

// Listar todos os modelos
export const getAllModelos = async (req: Request, res: Response) => {
  try {
    const modelos = await prisma.modelo.findMany({
      include: {
        veiculos: true,
        marca: true,
        categoria: true,
      },
    });
    res.status(200).json(modelos);
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

// Obter um modelo pelo ID
export const getModeloById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const modelo = await prisma.modelo.findUnique({
      where: { id: Number(id) },
      include: {
        veiculos: true,
        marca: true,
        categoria: true,
      },
    });

    if (!modelo) {
      res.status(404).json({ error: "Modelo não encontrado" });
    } else {
      res.status(200).json(modelo);
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

// Criar um novo modelo
export const createModelo = async (req: Request, res: Response) => {
  const { nome, anoModelo, qtModelo, marcaId, categoriaId } = req.body;

  if (!nome || !anoModelo || !qtModelo || !marcaId || !categoriaId) {
    res.status(401).json({ message: "Parametros invalidos. Necessário informar: nome, anoModelo, qtModelo, marcaId, categoriaId." });
  }

  try {
    const modelo = await prisma.modelo.create({
      data: {
        nome,
        anoModelo: new Date(anoModelo),
        qtModelo,
        marcaId,
        categoriaId,
      },
    });
    res.status(201).json(modelo);
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

// Atualizar um modelo
export const updateModelo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nome, anoModelo, qtModelo, marcaId, categoriaId } = req.body;

  if (!nome || !anoModelo || !qtModelo || !marcaId || !categoriaId) {
    res.status(401).json({ message: "Parametros invalidos. Necessário informar: nome, anoModelo, qtModelo, marcaId, categoriaId." });
  }

  try {
    const modelo = await prisma.modelo.update({
      where: { id: Number(id) },
      data: {
        nome,
        anoModelo: new Date(anoModelo),
        qtModelo,
        marcaId,
        categoriaId,
      },
    });

    res.status(200).json(modelo);
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

// Deletar um modelo
export const deleteModelo = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.modelo.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({ message: "Modelo deletado com sucesso" });
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
