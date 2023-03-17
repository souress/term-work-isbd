import axios from "../axiosAPI";

export const getAllLogs = async () => {
    const {data} = await axios.get('/api/logs')
    return data
}

export const getLogById = async (id) => {
    const {data} = await axios.get('/api/logs/' + id)
    return data
}

export const addLog = async (log) => {
    await axios.post('/api/logs', log)
        .then((response) => {
            return response.data
        }).catch((error) => {
            console.log(error)
        })
}

export const deleteLogById = async (id) => {
    await axios.delete('/api/logs/' + id)
        .then((response) => {
            return response.data
        }).catch((error) => {
            console.log(error)
        })
}

export const setLogType = async (id, log) => {
    await axios.post('/api/logs/' + id + '/update', log)
        .then((response) => {
            return response.data
        }).catch((error) => {
            console.log(error)
        })
}
