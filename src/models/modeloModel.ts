import { veiculo, Veiculo } from "./veiculoModel"

interface Modelo {
  id               : number
  nome             : String
  anoModelo        : Date
  qtModelo         : number
  Veiculo          : Veiculo[]
}

let modelo : Modelo [] = []

export {modelo, Modelo}