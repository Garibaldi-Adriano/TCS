import { Modelo, modelo } from "./modeloModel"

interface Categoria {
    id             : number
    tipo           : string
    valorLocacao   : number
    modelos        : Modelo[]
}

let categoria : Categoria [] = []

export {Categoria, categoria}