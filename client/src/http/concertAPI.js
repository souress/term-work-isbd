import axios from "../axiosAPI";

export const getAllLabels = async () => {
    const {data} = await axios.get('/api/concert/labels')
    return data
}

export const getLabelById = async (id) => {
    const {data} = await axios.get('/api/concert/labels/' + id)
    return data
}

export const addLabel = async (label) => {
    await axios.post('/api/concert/labels', label)
        .then((response) => {
            return response.data
        }).catch((error) => {
            console.log(error)
        })
}

export const deleteLabelById = async (id) => {
    await axios.delete('/api/concert/labels/' + id)
        .then((response) => {
            return response.data
        }).catch((error) => {
            console.log(error)
        })
}

export const addArtistToLabelById = async (labelId, artistId) => {
    await axios.post('/api/concert/labels/' + labelId + '/artist/' + artistId)
        .then((response) => {
            return response.data
        }).catch((error) => {
            console.log(error)
        })
}

export const addArtistToLabel = async (labelId, artist) => {
    await axios.post('/api/concert/labels/' + labelId + '/artist', artist)
        .then((response) => {
            return response.data
        }).catch((error) => {
            console.log(error)
        })
}


export const getAllArtists = async () => {
    const {data} = await axios.get('/api/concert/artists')
    return data
}

export const getArtistById = async (id) => {
    const {data} = await axios.get('/api/concert/artists/' + id)
    return data
}

export const addArtist = async (artist) => {
    await axios.post('/api/concert/artists', artist)
        .then((response) => {
            return response.data
        })
}

export const updateArtist = async (artist) => {
    await axios.post('/api/concert/artists/update', artist)
        .then((response) => {
            return response.data
        })
}

export const deleteArtistById = async (id) => {
    await axios.delete('/api/concert/artists/' + id)
        .then((response) => {
            return response.data
        }).catch((error) => {
            console.log(error)
        })
}

export const getAllSchedules = async () => {
    const {data} = await axios.get('/api/concert/schedules')
    return data
}

export const getScheduleById = async (id) => {
    const {data} = await axios.get('/api/concert/schedules/' + id)
    return data
}

export const getSchedulesByIds = async (ids) => {
    const {data} = await axios.post('/api/concert/schedules/byIds', ids)
    return data
}

export const addSchedule = async (schedule) => {
    await axios.post('/api/concert/schedules', schedule)
        .then((response) => {
            return response.data
        }).catch((error) => {
            console.log(error)
        })
}

export const deleteScheduleById = async (id) => {
    await axios.delete('/api/concert/schedules/' + id)
        .then((response) => {
            return response.data
        }).catch((error) => {
            console.log(error)
        })
}

export const signPersonToSchedule = async (scheduleId, personId) => {
    await axios.post('/api/concert/schedules/' + scheduleId + '/sign/' + personId)
        .then((response) => {
            return response.data
        }).catch((error) => {
            console.log(error)
        })
}

export const removePersonFromSchedule = async (scheduleId, personId) => {
    await axios.post('/api/concert/schedules/' + scheduleId + '/remove/' + personId)
        .then((response) => {
            return response.data
        }).catch((error) => {
            console.log(error)
        })
}

export const buyTicket = async (scheduleId, personId) => {
    await axios.post('/api/concert/schedules/' + scheduleId + '/buyTicket/' + personId)
        .then((response) => {
            return response.data
        }).catch((error) => {
            console.log(error)
        })
}

export const addRoomToScheduleById = async (scheduleId, roomId) => {
    await axios.post('/api/concert/schedules/' + scheduleId + '/room/' + roomId)
        .then((response) => {
            return response.data
        }).catch((error) => {
            console.log(error)
        })
}

export const addRoomToSchedule = async (scheduleId, room) => {
    await axios.post('/api/concert/schedules/' + scheduleId + '/room', room)
        .then((response) => {
            return response.data
        }).catch((error) => {
            console.log(error)
        })
}