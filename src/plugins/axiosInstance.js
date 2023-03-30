import axios from "axios"

const axiosRequest = axios.create({
    baseURL: "http://localhost:5000",
    timeout: 2000
})

export default axiosRequest
