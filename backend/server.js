import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use(cors());

app.post('/tarefas', async (req, res) => {
    const { tarefa, data } = req.body;

    // Criação da tarefa no banco de dados
    const newTask = await prisma.tasks.create({
        data: {
            tarefa,
            data: new Date(data + 'T00:00:00') // Armazena a data como UTC
        }
    });

    res.status(201).json(newTask);
});

app.get('/tarefas', async (req, res) => {
    const tasks = await prisma.tasks.findMany(); // Busca as tarefas do banco
    res.status(200).json(tasks);
});

app.delete('/tarefas/:id', async (req, res) => {
    await prisma.tasks.delete({
        where: {
            id: req.params.id
        }
    });

    res.status(200).json({ message: 'Tarefa Deletada com Sucesso!' });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
