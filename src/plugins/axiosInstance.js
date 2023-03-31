import axios from "axios"

const axiosRequest = axios.create({
    baseURL: "http://localhost:5000",
    timeout: 10000
})

export default axiosRequest
