import { Veiculo } from "./veiculoModel";

interface Manutencao {
  id: number;
  descricao: String;
  dataManutencao: Date;
  valorManutencao: number;
  veiculo: Veiculo;
}

let manutencao: Manutencao[] = [];

export { Manutencao, manutencao };
