import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import { ErrorRequest } from "../utils/TratamentoErros";

const prisma = new PrismaClient();

// Listar todas as categorias
export const getAllCategorias = async (req: Request, res: Response) => {
  try {
    const categorias = await prisma.categoria.findMany({
      include: {
        modelos: true,
      },
    });
    res.status(200).json(categorias);
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

// Obter uma categoria pelo ID
export const getCategoriaById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const categoria = await prisma.categoria.findUnique({
      where: { id: Number(id) },
      include: {
        modelos: true,
      },
    });

    if (!categoria) {
      res.status(404).json({ error: "Categoria não encontrada" });
    } else {
      res.status(200).json(categoria);
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

// Criar uma nova categoria
export const createCategoria = async (req: Request, res: Response) => {
  const { tipo, valorLocacao } = req.body;

  if (!tipo || !valorLocacao) {
    res.status(401).json({ message: "Parametros invalidos. Necessário informar o tipo e o valorLocacao." });
  }

  try {
    const categoria = await prisma.categoria.create({
      data: {
        tipo,
        valorLocacao,
      },
    });
    res.status(201).json(categoria);
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

// Atualizar uma categoria
export const updateCategoria = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { tipo, valorLocacao } = req.body;

  if (!tipo || !valorLocacao) {
    res.status(401).json({ message: "Parametros invalidos. Necessário informar o tipo e o valorLocacao." });
  }

  try {
    const categoria = await prisma.categoria.update({
      where: { id: Number(id) },
      data: {
        tipo,
        valorLocacao,
      },
    });

    res.status(200).json(categoria);
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

// Deletar uma categoria
export const deleteCategoria = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.categoria.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({ message: "Categoria deletada com sucesso" });
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
