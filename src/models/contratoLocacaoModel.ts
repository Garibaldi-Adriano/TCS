import { Veiculo, veiculo } from "./veiculoModel"
import { Ocorrencia, ocorrencia } from "./ocorrenciaModel"


interface ContratoLocacao {
    id               : number
    dataLocacao      : Date
    dataDevolucao    : Date
    valorCaucao      : number
    valorTotal       : number
    status           : String
    veiculos         : Veiculo[]
    ocorrencias      : Ocorrencia[]
}

let contratoLocacao : ContratoLocacao [] = []

export {ContratoLocacao, contratoLocacao}