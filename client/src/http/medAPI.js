import axios from "../axiosAPI";

export const getAllMedicines = async () => {
    const {data} = await axios.get('/api/med/medicines')
    return data
}

export const getMedicineById = async (id) => {
    const {data} = await axios.get('/api/med/medicines/' + id)
    return data
}

export const addMedicine = async (medicine) => {
    await axios.post('/api/med/medicines', medicine)
        .then((response) => {
            return response.data
        }).catch((error) => {
            console.log(error)
        })
}

export const deleteMedicineById = async (id) => {
    await axios.delete('/api/med/medicines/' + id)
        .then((response) => {
            return response.data
        }).catch((error) => {
            console.log(error)
        })
}

export const setMedicineSupplierById = async (medId, supId) => {
    await axios.post('/api/med/medicines/' + medId + '/supplier/' + supId)
        .then((response) => {
            return response.data
        }).catch((error) => {
            console.log(error)
        })
}


export const setMedicineSupplier = async (medId, supplier) => {
    await axios.post('/api/med/medicines/' + medId + '/supplier', supplier)
        .then((response) => {
            return response.data
        }).catch((error) => {
            console.log(error)
        })
}


export const setMedicineQuantity = async (id, amount) => {
    await axios.post('/api/med/medicines/' + id + '/amount/' + amount)
        .then((response) => {
            return response.data
        }).catch((error) => {
            console.log(error)
        })
}


export const getAllSuppliers = async () => {
    const {data} = await axios.get('/api/med/suppliers')
    return data
}

export const addSupplier = async (supplier) => {
    await axios.post('/api/med/suppliers', supplier)
        .then((response) => {
            return response.data
        }).catch((error) => {
            console.log(error)
        })
}

export const getSupplierById = async (id) => {
    await axios.get('/api/med/suppliers/' + id)
        .then((response) => {
            return response.data
        }).catch((error) => {
            console.log(error)
        })
}

export const deleteSupplierById = async (id) => {
    await axios.delete('/api/med/suppliers/' + id)
        .then((response) => {
            return response.data
        }).catch((error) => {
            console.log(error)
        })
}

