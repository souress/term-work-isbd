import axios, {$host} from "../axiosAPI";
import jwtDecode from "jwt-decode";

export const registerFunc = async (login, password) => {
    await axios.post('/api/auth/register', {login, password})
        .then((response) => {
            localStorage.setItem('token', response.data.token)
            return jwtDecode(response.data.token)
        }).catch((error) => {
            document.getElementById("reg_err_msg").textContent = error.response.data.errorCode
            throw Error
        })
}

export const loginFunc = async (login, password) => {
    await axios.post('/api/auth/login', {login, password})
        .then((response) => {
            localStorage.setItem('token', response.data.token)
            return jwtDecode(response.data.token)
        }).catch((error) => {
            document.getElementById("auth_err_msg").textContent = error.response.data.errorCode
            throw Error
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

export const checkRole = async (login) => {
    const {data} = await axios.get('/api/auth/checkRole/' + login)
    localStorage.setItem('userRole', data.role)
    return data.role
}

export const getRoles = async () => {
    const {data} = await axios.get('/api/auth/roles')
    return data
}

export const addUser = async (user) => {
    await axios.post('/api/auth/users', user)
}

export const setPersonForUser = async (login, personId) => {
    await axios.post('/api/auth/user/' + login + '/setPerson/' + personId)
}

export const getPersonForUser = async (login) => {
    const {data} = await axios.get('/api/auth/user/' + login + '/person')
    return data
}