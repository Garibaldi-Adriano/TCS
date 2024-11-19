import { Router } from "express";
import { getAllMarcas, getMarcaById, createMarca, updateMarca, deleteMarca } from "../controllers/marcaController";
import { getAllModelos, getModeloById, createModelo, updateModelo, deleteModelo } from "../controllers/modeloController";
import { getAllCategorias, getCategoriaById, createCategoria, updateCategoria, deleteCategoria } from "../controllers/categoriaController";
import { getAllVeiculos, getVeiculoById, createVeiculo, updateVeiculo, deleteVeiculo } from "../controllers/veiculoController";
import { getAllManutencoes, getManutencaoById, createManutencao, updateManutencao, deleteManutencao } from "../controllers/manutencaoController";
// import { getAllOcorrencias, getOcorrenciaById, createOcorrencia, updateOcorrencia, deleteOcorrencia } from '../controllers/ocorrenciaController';
// import { getAllContratoLocacoes, getContratoLocacaoById, createContratoLocacao, updateContratoLocacao, deleteContratoLocacao } from '../controllers/contratoLocacaoController';
// import { getAllPagamentos, getPagamentoById, createPagamento, updatePagamento, deletePagamento } from '../controllers/pagamentoController';

const router = Router();

//***** MARCA ******** */
router.post("/marcas", createMarca);
router.get("/marcas", getAllMarcas);
router.get("/marcas/:id", getMarcaById);
router.put("/marcas/:id", updateMarca);
router.delete("/marcas/:id", deleteMarca);

//***** MODELO ******** */
router.post("/modelos", createModelo);
router.get("/modelos", getAllModelos);
router.get("/modelos/:id", getModeloById);
router.put("/modelos/:id", updateModelo);
router.delete("/modelos/:id", deleteModelo);

//***** CATEGORIA ******** */
router.post("/categorias", createCategoria);
router.get("/categorias", getAllCategorias);
router.get("/categorias/:id", getCategoriaById);
router.put("/categorias/:id", updateCategoria);
router.delete("/categorias/:id", deleteCategoria);

//***** VEICULO ******** */
router.post("/veiculos", createVeiculo);
router.get("/veiculos", getAllVeiculos);
router.get("/veiculos/:id", getVeiculoById);
router.put("/veiculos/:id", updateVeiculo);
router.delete("/veiculos/:id", deleteVeiculo);

//***** MANUTENCAO ******** */
router.post("/manutencoes", createManutencao);
router.get("/manutencoes", getAllManutencoes);
router.get("/manutencoes/:id", getManutencaoById);
router.put("/manutencoes/:id", updateManutencao);
router.delete("/manutencoes/:id", deleteManutencao);

//***** OCORRENCIA ******** */
// router.post('/ocorrencias', createOcorrencia)
// router.get('/ocorrencias', getAllOcorrencias)
// router.get('/ocorrencias/:id', getOcorrenciaById)
// router.put('/ocorrencias/:id',updateOcorrencia)
// router.delete('/ocorrencias/:id', deleteOcorrencia)

//***** CONTRATO LOCACAO ******** */
// router.post('/contratoLocacoes', createContratoLocacao)
// router.get('/contratoLocacoes', getAllContratoLocacoes)
// router.get('/contratoLocacoes/:id', getContratoLocacaoById)
// router.put('/contratoLocacoes/:id',updateContratoLocacao)
// router.delete('/contratoLocacoes/:id', deleteContratoLocacao)

//***** PAGAMENTO ******** */
// router.post('/pagamentos', createPagamento)
// router.get('/pagamentos', getAllPagamentos)
// router.get('/pagamentos/:id', getPagamentoById)
// router.put('/pagamentos/:id',updatePagamento)
// router.delete('/pagamentos/:id', deletePagamento)

export default router;
