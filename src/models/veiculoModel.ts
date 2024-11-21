import { Marca } from "./marcaModel";
import { Modelo } from "./modeloModel";
import { manutencao, Manutencao } from "./manutencaoModel";

interface Veiculo {
  id: number;
  placa: String;
  chassi: String;
  anoFabricacao: number;
  cor: String;
  marca: Marca;
  modelo: Modelo;
  status: String;
  manutencao: Manutencao[];
}

let veiculo: Veiculo[] = [];

export { Veiculo, veiculo };
