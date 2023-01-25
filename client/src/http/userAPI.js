import axios, {$host} from "../axiosAPI";
import jwtDecode from "jwt-decode";

export const registerFunc = async (login, password) => {
    const {data} = await $host.post('/api/auth/register', {login, password})
    localStorage.setItem('token', data)
    return jwtDecode(data)
}

export const loginFunc = async (login, password) => {
    const {data} = await $host.post('/api/auth/login', {login, password})
    localStorage.setItem('token', data)
    return jwtDecode(data)
}

export const check = async (login) => {
    const {data} = await axios.get('/api/auth/check/' + login)
    return jwtDecode(data)
}

export const checkAdmin = async (login) => {
    const {data} = await axios.get('/api/auth/checkAdmin/' + login)
    console.log(data)
    localStorage.setItem('adminRights', data.adminRights)
    return data.adminRights
}
