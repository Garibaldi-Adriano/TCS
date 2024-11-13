import { ContratoLocacao } from "./contratoLocacaoModel"

interface Pagamento {
    id               : number
    data             : Date
    valorPago        : number
    formaPagamento   : String
    contrato         : ContratoLocacao
}

let pagamento : Pagamento [] = []

export {Pagamento, pagamento}