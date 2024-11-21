import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import { ErrorRequest } from "../utils/TratamentoErros";
import { manutencao } from "../models/manutencaoModel";

const prisma = new PrismaClient();

// Listar todos os veículos
export const getAllVeiculos = async (req: Request, res: Response) => {
  try {
    const veiculos = await prisma.veiculo.findMany({
      include: {
        manutencao: true,
      },
    });
    res.status(200).json(veiculos);
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

// Obter um veículo pelo ID
export const getVeiculoById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const veiculo = await prisma.veiculo.findUnique({
      where: { id: Number(id) },
      include: {
        manutencao: true,
      },
    });

    if (!veiculo) {
      res.status(404).json({ error: "Veículo não encontrado" });
    } else {
      res.status(200).json(veiculo);
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

// Criar um novo veículo
export const createVeiculo = async (req: Request, res: Response) => {
  const { placa, chassi, anoFabricacao, cor, marcaId, modeloId, status } = req.body;

  if (!placa || !chassi || !anoFabricacao || !cor || !marcaId || !modeloId || !status) {
    res.status(401).json({ message: "Parametros invalidos. Necessário informar: placa, chassi, anoFabricacao, cor, marcaId, modeloId e o status." });
  }

  try {
    const veiculo = await prisma.veiculo.create({
      data: {
        placa,
        chassi,
        anoFabricacao,
        cor,
        marcaId,
        modeloId,
        status,
      },
    });
    res.status(201).json(veiculo);
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

// Atualizar um veículo
export const updateVeiculo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { placa, chassi, anoFabricacao, cor, marcaId, modeloId, status } = req.body;

  if (!placa || !chassi || !anoFabricacao || !cor || !marcaId || !modeloId || !status) {
    res.status(401).json({ message: "Parametros invalidos. Necessário informar: placa, chassi, anoFabricacao, cor, marcaId, modeloId e o status." });
  }

  try {
    const veiculo = await prisma.veiculo.update({
      where: { id: Number(id) },
      data: {
        placa,
        chassi,
        anoFabricacao,
        cor,
        marcaId,
        modeloId,
        status,
        manutencao: {
          upsert: manutencao.map((manutencao: any) => ({
            where: { id: manutencao.id },
            update: {
              descricao: manutencao.descricao,
              dataManutencao: manutencao.dataManutencao,
              valorManutencao: manutencao.valorManutencao,
            },
            create: {
              descricao: manutencao.descricao,
              dataManutencao: manutencao.dataManutencao,
              valorManutencao: manutencao.valorManutencao,
            },
          })),
        },
      },
    });

    res.status(200).json(veiculo);
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

// Deletar um veiculo
export const deleteVeiculo = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.veiculo.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({ message: "Veículo deletado com sucesso" });
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
