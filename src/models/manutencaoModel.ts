
interface Manutencao {
    id               : number
    descricao        : String
    dataManutencao   : Date
    valorManutencao  : number
}

let manutencao : Manutencao [] = []

export {Manutencao, manutencao}