import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import { ErrorRequest } from "../utils/TratamentoErros";

const prisma = new PrismaClient();

// Listar todas as marcas
export const getAllMarcas = async (req: Request, res: Response) => {
  try {
    const marcas = await prisma.marca.findMany({
      include: {
        modelos: true,
        veiculos: true,
      },
    });
    res.status(200).json(marcas);
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

// Obter uma marca pelo ID
export const getMarcaById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const marca = await prisma.marca.findUnique({
      where: { id: Number(id) },
      include: {
        modelos: true,
        veiculos: true,
      },
    });

    if (!marca) {
      res.status(404).json({ error: "Marca não encontrada" });
    } else {
      res.status(200).json(marca);
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

// Criar uma nova marca
export const createMarca = async (req: Request, res: Response) => {
  const { nome } = req.body;

  if (!nome) {
    res.status(401).json({ message: "Parametros invalidos. Necessário informar: nome." });
  }

  try {
    const marca = await prisma.marca.create({
      data: {
        nome
      },
    });
    res.status(201).json(marca);
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

// Atualizar uma marca
export const updateMarca = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nome } = req.body;

  if (!nome) {
    res.status(401).json({ message: "Parametros invalidos. Necessário informar: nome e modelos." });
  }

  try {
    const marca = await prisma.marca.update({
      where: { id: Number(id) },
      data: {
        nome
      },
      include: {
        modelos: true,
      },
    });

    res.status(200).json(marca);
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

// Deletar uma marca
export const deleteMarca = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const marca = await prisma.marca.findUnique({
      where: { id: Number(id) },
      include: {
        modelos: true,
        veiculos: true,
      },
    });

    await prisma.marca.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({ message: `Marca ${marca?.nome} deletada com sucesso` });
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
