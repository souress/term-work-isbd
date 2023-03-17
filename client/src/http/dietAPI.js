import axios from "../axiosAPI";

export const getAllProducts = async () => {
    const {data} = await axios.get('/api/diet/products')
    return data
}

export const getProductById = async (id) => {
    const {data} = await axios.get('/api/diet/products/' + id)
    return data
}

export const addProduct = async (product) => {
    await axios.post('/api/diet/products', product)
        .then((response) => {
            return response.data
        }).catch((error) => {
            console.log(error)
        })
}

export const deleteProductById = async (id) => {
    await axios.delete('/api/diet/products/' + id)
        .then((response) => {
            return response.data
        }).catch((error) => {
            console.log(error)
        })
}

export const makeDiet = async (productId, treatmentId) => {
    await axios.post('/api/diet/products/' + productId + '/treatment/' + treatmentId)
        .then((response) => {
            return response.data
        }).catch((error) => {
            console.log(error)
        })
}

export const getAllTreatmentPrograms = async () => {
    const {data} = await axios.get('/api/diet/treatment')
    return data
}

export const getTreatmentProgramById = async (id) => {
    const {data} = await axios.get('/api/diet/treatment/' + id)
    return data
}

export const addTreatmentProgram = async (treatment) => {
    await axios.post('/api/diet/treatment', treatment)
        .then((response) => {
            return response.data
        }).catch((error) => {
            console.log(error)
        })
}

export const deleteTreatmentProgramById = async (id) => {
    await axios.delete('/api/diet/treatment/' + id)
        .then((response) => {
            return response.data
        }).catch((error) => {
            console.log(error)
        })
}

export const setDiagnosis = async (treatmentId, diagnosis) => {
    await axios.post('/api/diet/treatment/' + treatmentId + '/treatment', diagnosis)
        .then((response) => {
            return response.data
        }).catch((error) => {
            console.log(error)
        })
}