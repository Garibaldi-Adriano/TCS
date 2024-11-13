import express from 'express'
import dotenv from 'dotenv'
import authRouters from './router/routes'
import { PrismaClient } from '@prisma/client';


dotenv.config()
const app = express()
const PORTA = process.env.PORT
const prisma = new PrismaClient();

app.use(express.json())
app.use('/api',authRouters)

app.listen(PORTA,() =>{
    console.log(`Servidor executando na porta: ${PORTA}`)
})