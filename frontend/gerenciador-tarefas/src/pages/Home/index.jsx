import "./style.css";
import Trash from "../../assets/trash.svg";
import api from "../../services/api";
import { useEffect, useState, useRef } from "react";

function Home() {
    const [tasks, setTasks] = useState([]);
    const inputTarefa = useRef();
    const inputData = useRef();

    // Função para buscar tarefas do backend
    async function getTasks() {
        const tasksFromApi = await api.get('/tarefas');
        setTasks(tasksFromApi.data);
    }

    // Função para criar uma nova tarefa
    async function createTasks() {
        const tarefaValue = inputTarefa.current.value;
        const dataValue = inputData.current.value;

        await api.post('/tarefas', {
            tarefa: tarefaValue,
            data: dataValue // Envia a data diretamente
        });

        // Limpa os campos após adicionar a tarefa
        inputTarefa.current.value = '';
        inputData.current.value = '';

        getTasks(); // Atualiza a lista após criar uma nova tarefa
    }

    // Função para deletar uma tarefa
    async function deleteTasks(id) {
        await api.delete(`/tarefas/${id}`);
        getTasks();
    }

    // Efeito para buscar tarefas ao montar o componente
    useEffect(() => {
        getTasks();
    }, []);

    return (
        <div className="container">
            <form onSubmit={(e) => { e.preventDefault(); createTasks(); }}>
                <h1>Gerenciador de Tarefas</h1>
                <input placeholder="Tarefa" name="tarefa" type="text" ref={inputTarefa} required />
                <input placeholder="Data" name="data" type="date" ref={inputData} required />
                <button type="submit">Salvar</button>
            </form>

            {tasks.map((task) => (
                <div key={task.id} className="card">
                    <div>
                        <p>Tarefa: <span>{task.tarefa}</span></p>
                        <p>Data: <span>{new Date(task.data).toLocaleDateString('pt-BR')}</span></p> {/* Exibe a data formatada */}
                    </div>
                    <button onClick={() => deleteTasks(task.id)}>
                        <img src={Trash} alt="Deletar" />
                    </button>
                </div>
            ))}
        </div>
    );
}

export default Home;
