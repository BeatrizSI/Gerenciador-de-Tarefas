import axios from "axios";

//criar a conexão com o servidor
const api = axios.create({
    baseURL: 'http://localhost:3000'
})

export default api