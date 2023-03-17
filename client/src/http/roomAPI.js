import axios, {$host} from "../axiosAPI";

export const getAllRooms = async () => {
    const {data} = await axios.get('/api/rooms')
    return data
}

export const getRoomById = async (id) => {
    const {data} = await axios.get('/api/rooms/' + id)
    return data
}

export const addRoom = async (room) => {
    await axios.post('/api/rooms', room)
        .then((response) => {
            return response.data
        }).catch((error) => {
            console.log(error)
        })
}

export const deleteRoomById = async (id) => {
    await axios.delete('/api/rooms/' + id)
        .then((response) => {
            return response.data
        }).catch((error) => {
            console.log(error)
        })
}

export const setRoomType = async (id, roomType) => {
    await axios.post('/api/rooms/'+id+'/'+roomType)
        .then((response) => {
            return response.data
        }).catch((error) => {
            console.log(error)
        })
}