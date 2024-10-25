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
    await api.post('/tarefas', {
      tarefa: inputTarefa.current.value,
      data: new Date(inputData.current.value).toISOString() // Formata a data corretamente
    });
    getTasks(); // Atualiza a lista após criar uma nova tarefa
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
        <button type="submit">Criar</button>
      </form>

      {tasks.map((task) => (
        <div key={task.id} className="card">
          <div>
            <p>Tarefa: <span>{task.tarefa}</span></p>
            <p>Data: <span>{new Date(task.data).toLocaleDateString()}</span></p>
          </div>
          <button>
            <img src={Trash} alt="Deletar" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
