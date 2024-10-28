import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors'

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use(cors())

app.post('/tarefas', async (req, res) => {

        const { tarefa, data } = req.body;

        // Criação da tarefa no banco de dados
        const newTask = await prisma.tasks.create({
            data: {
                tarefa: req.body.tarefa,
                data: req.body.data
            }
        });
        // Retorna a nova tarefa criada
        res.status(201).json(newTask);
    
});

app.get('/tarefas', async (req, res) => {

        const tasks = await prisma.tasks.findMany(); // Busca as tarefas do banco
        res.status(200).json(tasks);
    
});

app.put('/tarefas/:id', async (req, res) => {
    await prisma.tasks.update({
        where: {
            id: req.params.id // Captura o ID da tarefa a ser atualizada a partir da URL.
        },
        data: {
            tarefa: req.body.tarefa, // Atualiza a tarefa com o novo valor.
            data: req.body.data       // Atualiza a data com o novo valor.
        }
    });
    res.status(200).json(req.body);
});

app.delete('/tarefas/:id', async(req, res) => {
    await prisma.tasks.delete({
        where:{
            id: req.params.id
        }
    })

    res.status(200).json({message: 'Tarefa Deletada com Sucesso!'})
})

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
