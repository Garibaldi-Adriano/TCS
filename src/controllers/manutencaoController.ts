import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import { ErrorRequest } from "../utils/TratamentoErros";

const prisma = new PrismaClient();

// Listar todas as manutenções
export const getAllManutencoes = async (req: Request, res: Response) => {
  try {
    const manutencao = await prisma.manutencao.findMany();
    res.status(200).json(manutencao);
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

// Obter uma manutenção pelo ID
export const getManutencaoById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const manutencao = await prisma.manutencao.findUnique({
      where: { id: Number(id) },
    });

    if (!manutencao) {
      res.status(404).json({ error: "Manutenção não encontrada" });
    } else {
      res.status(200).json(manutencao);
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

// Criar uma nova manutenção
export const createManutencao = async (req: Request, res: Response) => {
  const { descricao, dataManutencao, valorManutencao, veiculo } = req.body;

  if (!descricao || !dataManutencao || !valorManutencao || !veiculo) {
    res.status(401).json({ message: "Parametros invalidos. Necessário informar a descricao, dataManutencao, valorManutencao e o veiculo." });
  }

  try {
    const manutencao = await prisma.manutencao.create({
      data: {
        descricao,
        dataManutencao: new Date(dataManutencao),
        valorManutencao,
        veiculo: {
          create: veiculo,
        },
      },
    });
    res.status(201).json(manutencao);
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

// Atualizar uma manutenção
export const updateManutencao = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { descricao, dataManutencao, valorManutencao, veiculo } = req.body;

  if (!descricao || !dataManutencao || !valorManutencao || !veiculo) {
    res.status(401).json({ message: "Parametros invalidos. Necessário informar a descricao, dataManutencao, valorManutencao e o veiculo." });
  }

  try {
    const manutencao = await prisma.manutencao.update({
      where: { id: Number(id) },
      data: {
        descricao,
        dataManutencao: new Date(dataManutencao),
        valorManutencao,
        veiculo: {
          upsert: veiculo.map((veiculo: any) => ({
            where: { id: veiculo.id },
            update: {
              placa: veiculo.placa,
              chassi: veiculo.chassi,
              anoFabricacao: veiculo.anoFabricacao,
              cor: veiculo.cor,
              marcaId: veiculo.marcaId,
              modeloId: veiculo.modeloId,
              status: veiculo.status,
              manutencao: veiculo.manutencao,
            },
            create: {
              placa: veiculo.placa,
              chassi: veiculo.chassi,
              anoFabricacao: veiculo.anoFabricacao,
              cor: veiculo.cor,
              marcaId: veiculo.marcaId,
              modeloId: veiculo.modeloId,
              status: veiculo.status,
              manutencao: veiculo.manutencao,
            },
          })),
        },
      },
    });

    res.status(200).json(manutencao);
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

// Deletar uma manutenção
export const deleteManutencao = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.manutencao.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({ message: "Manutenção deletada com sucesso" });
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
