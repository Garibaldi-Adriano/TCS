import { modelo, Modelo } from "./modeloModel"

interface Marca {
    id : number
    nome : string,
    modelos: Modelo[]
}

let marca : Marca [] = []

export {Marca, marca}