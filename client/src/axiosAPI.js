import axios from "axios"

export default axios.create({
    baseURL: "http://localhost:8080"
})

export const $host = axios.create({
    baseURL: "http://localhost:8080"
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

axios.interceptors.request.use(authInterceptor)