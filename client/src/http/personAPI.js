import axios from "../axiosAPI";

export const getAllPersons = async () => {
    const {data} = await axios.get('/api/persons')
    return data
}

export const getPersonById = async (id) => {
    const {data} = await axios.get('/api/persons/' + id)
    return data
}

export const addPerson = async (person) => {
    await axios.post('/api/persons', person)
        .then((response) => {
            return response.data
        }).catch((error) => {
            console.log(error)
        })
}

export const deletePersonById = async (id) => {
    await axios.delete('/api/persons/' + id)
        .then((response) => {
            return response.data
        }).catch((error) => {
            console.log(error)
        })
}

export const setPersonBalanceById = async (id, balance) => {
    await axios.post('/api/persons/' + id + '/' + balance)
        .then((response) => {
            return response.data
        }).catch((error) => {
            console.log(error)
        })
}
export const getPersonSchedulesById = async (id) => {
    await axios.post('/api/persons/' + id + '/schedules')
        .then((response) => {
            return response.data
        }).catch((error) => {
            console.log(error)
        })
}