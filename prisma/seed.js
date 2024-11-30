const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Criando Categorias
  const categorias = await prisma.categoria.createMany({
    data: [
      { tipo: 'Sedan', valorLocacao: 120.0 },
      { tipo: 'SUV', valorLocacao: 180.0 },
      { tipo: 'Hatch', valorLocacao: 100.0 },
      { tipo: 'Picape', valorLocacao: 250.0 },
      { tipo: 'Esportivo', valorLocacao: 400.0 },
    ],
  });

  const categoriasCriadas = await prisma.categoria.findMany();

  // Criando Marcas
  const marcas = await prisma.marca.createMany({
    data: [
      { nome: 'Toyota' },
      { nome: 'Honda' },
      { nome: 'Ford' },
      { nome: 'Chevrolet' },
      { nome: 'BMW' },
      { nome: 'Audi' },
      { nome: 'Hyundai' },
      { nome: 'Volkswagen' },
    ],
  });

  const marcasCriadas = await prisma.marca.findMany();

  // Criando Modelos
  const modelos = [];
  for (let i = 1; i <= 10; i++) {
    const modelo = await prisma.modelo.create({
      data: {
        nome: `Modelo ${i}`,
        anoModelo: 2020 + (i % 5),
        qtModelo: Math.floor(Math.random() * 10) + 1,
        categoriaId: categoriasCriadas[i % categoriasCriadas.length].id,
        marcaId: marcasCriadas[i % marcasCriadas.length].id,
      },
    });
    modelos.push(modelo);
  }

// Criando Veículos com chassi e placa únicos
for (let i = 1; i <= 30; i++) {
    await prisma.veiculo.create({
      data: {
        placa: `PLACA${i}${Date.now().toString().slice(-4)}`, // Gera uma placa única usando índice e parte do timestamp
        chassi: `CHASSI${Date.now()}${i}`, // Gera um chassi único
        anoFabricacao: 2015 + (i % 5),
        cor: ['Preto', 'Branco', 'Vermelho', 'Azul', 'Prata'][i % 5],
        status: i % 2 === 0 ? 'Disponível' : 'Alugado',
        marcaId: marcasCriadas[i % marcasCriadas.length].id,
        modeloId: modelos[i % modelos.length].id,
      },
    });
  }
  

  const veiculosCriados = await prisma.veiculo.findMany();

// Criando Clientes com emails únicos
for (let i = 1; i <= 20; i++) {
    await prisma.cliente.create({
      data: {
        nomeCompleto: `Cliente ${i}`,
        cpf: `${Math.floor(10000000000 + Math.random() * 90000000000)}`, // CPF único
        email: `cliente${i}${Date.now().toString().slice(-4)}@example.com`, // Email único
        telefone: `1198765${i.toString().padStart(4, '0')}`,
        cep: '12345678',
        endereco: `Rua ${i}`,
        numero: `${i}`,
        complemento: i % 2 === 0 ? 'Apto' : 'Casa',
        bairro: 'Centro',
        cidade: 'Cidade Teste',
        estado: 'SP',
      },
    });
  }
  

  const clientesCriados = await prisma.cliente.findMany();

  // Criando Contratos de Locação
  for (let i = 1; i <= 6; i++) {
    await prisma.contratoLocacao.create({
      data: {
        dataLocacao: new Date(2024, i % 12, 10),
        dataDevolucao: new Date(2024, (i % 12) + 1, 10),
        valorCaucao: Math.random() * 1000 + 500,
        valorTotal: Math.random() * 2000 + 1000,
        status: i % 2 === 0 ? 'Concluído' : 'Em andamento',
        veiculos: {
          create: [
            {
              veiculoId: veiculosCriados[(i * 2) % veiculosCriados.length].id,
            },
          ],
        },
        clientes: {
          create: [
            {
              clienteId: clientesCriados[i % clientesCriados.length].id,
            },
          ],
        },
      },
    });
  }

  const contratosCriados = await prisma.contratoLocacao.findMany();

  // Criando Manutenções
  for (let i = 1; i <= 3; i++) {
    await prisma.manutencao.create({
      data: {
        descricao: `Manutenção ${i}`,
        dataManutencao: new Date(2024, i % 12, 15),
        valorManutencao: Math.random() * 500 + 200,
        veiculoId: veiculosCriados[i % veiculosCriados.length].id,
      },
    });
  }

  // Criando Ocorrências
  await prisma.ocorrencia.create({
    data: {
      descricao: 'Batida leve no para-choque',
      dataOcorrencia: new Date(2024, 5, 20),
      valorOcorrencia: 300.0,
      contratoId: contratosCriados[0].id,
    },
  });

  // Criando Pagamentos
  for (let i = 1; i <= 4; i++) {
    await prisma.pagamento.create({
      data: {
        data: new Date(2024, i % 12, 5),
        valorPago: Math.random() * 1000 + 500,
        formaPagamento: ['Cartão', 'Boleto', 'Pix'][i % 3],
        contratoId: contratosCriados[i % contratosCriados.length].id,
      },
    });
  }

  console.log('Seed data has been added successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
