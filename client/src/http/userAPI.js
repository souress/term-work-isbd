import axios, {$host} from "../axiosAPI";
import jwtDecode from "jwt-decode";

export const registerFunc = async (login, password) => {
    await $host.post('/api/auth/register', {login, password})
        .then((response) => {
            localStorage.setItem('token', response.data.token)
            return jwtDecode(response.data.token)
        }).catch((error) => {
            document.getElementById("reg_err_msg").textContent = error.response.data.errorCode
            throw Error
        })
}

export const loginFunc = async (login, password) => {
    await $host.post('/api/auth/login', {login, password})
        .then((response) => {
            console.log(response.data)
            localStorage.setItem('token', response.data.token)
            return jwtDecode(response.data.token)
        }).catch((error) => {
            console.log(error.response)
            document.getElementById("reg_err_msg").textContent = error.response.data.errorCode
        })
}

export const check = async (login) => {
    const {data} = await axios.get('/api/auth/check/' + login)
    return jwtDecode(data)
}

export const checkAdmin = async (login) => {
    const {data} = await axios.get('/api/auth/checkAdmin/' + login)
    localStorage.setItem('adminRights', data.adminRights)
    return data.adminRights
}
