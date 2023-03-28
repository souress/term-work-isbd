import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import "react-widgets/styles.css";
import {addSchedule, getAllArtists} from "../../http/concertAPI";
import {getAllRooms} from "../../http/roomAPI";
import DropdownList from "react-widgets/DropdownList";
import {Input} from "@nextui-org/react";

const EditSchedule = observer(({show, onHide}) => {
    const [artist, setArtist] = useState('')
    const [artists, setArtists] = useState([])
    const [place, setPlace] = useState('')
    const [places, setPlaces] = useState([{}])
    const [price, setPrice] = useState(0)
    const [begin, setBegin] = useState('')
    const [duration, setDuration] = useState(0)
    const [submitDisabled, setSubmitDisabled] = useState(false)

    const fetchArtists = () => {
        getAllArtists().then((r) => {
            setArtists(r.map(x => {
                return `${x.name} #${x.id}`
            }))
        })
    }

    const fetchPlaces = () => {
        getAllRooms().then((r) => {
            setPlaces(r.map(x => {
                return `${x.roomType} #${x.id}`
            }).filter(r => !r.includes("HOSPITAL_CHAMBER")))
        })
    }

    const validate = (property, value) => {
        switch (property) {
            case 'artist':
                return artists.includes(value)
            case 'place':
                return places.includes(value)
            case 'price':
                return value >= 0
            case 'duration':
                return value > 0
            default:
                return false
        }
    }

    const validateForm = () => {
        let valid = true
        if (!validate('artist', artist)){
            document.getElementById("artist_err_msg").innerHTML +=
                "<br/>Выберите значение из списка!"
            valid = false
        }
        if (!validate('place', place)){
            document.getElementById("place_err_msg").innerHTML +=
                "<br/>Выберите значение из списка!"
            valid = false
        }
        if (!validate('price', price)){
            document.getElementById("price_err_msg").innerHTML +=
                "<br/>Введите число больше нуля!"
            valid = false
        }
        if (!validate('duration', duration)){
            document.getElementById("duration_err_msg").innerHTML +=
                "<br/>Продолжительность не может быть меньше или равной нулю"
            valid = false
        }
        return valid
    }

    const click = () => {
        let validationResult = validateForm()
        setSubmitDisabled(validationResult)
        if (validationResult) {
            let placeId = place.split(' #')[1]
            let artistId = artist.split(' #')[1]
            let schedule = {"artist": artistId, "place": placeId, price, begin, duration}
            addSchedule(schedule).then(() => {
                document.getElementById("schedule_msg").textContent = "Расписание добавлено"
            }).catch(error => {
                document.getElementById("schedule_msg").textContent = error.response.data.errorCode
            })
        }
    }

    const clearErrors = () => {
        document.getElementById("artist_err_msg").innerHTML = ''
        document.getElementById("place_err_msg").innerHTML = ''
        document.getElementById("price_err_msg").innerHTML = ''
        document.getElementById("duration_err_msg").innerHTML = ''
        document.getElementById("schedule_msg").textContent = ''

    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Расписание
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-1">
                        <Form.Label className="d-flex">Артист</Form.Label>
                        <DropdownList
                            value={artist}
                            onChange={(nextValue) => {
                                clearErrors()
                                setArtist(nextValue)
                                setSubmitDisabled(false)
                            }}
                            onClick={fetchArtists}
                            data={artists}
                            placeholder={"Выберите артиста"}
                        />
                    </Form.Group>
                    <div style={{color: "red", fontSize: 15}} id="artist_err_msg"></div>
                    <Form.Group className="mb-1">
                        <Form.Label className="d-flex">Помещение</Form.Label>
                        <DropdownList
                            value={place}
                            onChange={(nextValue) => {
                                clearErrors()
                                setPlace(nextValue)
                                setSubmitDisabled(false)
                            }}
                            onClick={fetchPlaces}
                            data={places}
                            placeholder={"Выберите помещение"}
                        />
                    </Form.Group>
                    <div style={{color: "red", fontSize: 15}} id="place_err_msg"></div>
                    <Form.Group className="mb-1">
                        <Form.Label className="d-flex">Цена билета</Form.Label>
                        <Form.Control
                            value={price}
                            onChange={e => {
                                setPrice(e.target.value)
                                setSubmitDisabled(false)
                            }}
                            className="mt-3"
                            placeholder="Введите цену билета"
                        />
                    </Form.Group>
                    <div style={{color: "red", fontSize: 15}} id="price_err_msg"></div>
                    <Form.Group className="mb-1">
                        <Form.Label className="d-flex">Дата начала</Form.Label>
                        <Input
                            type="datetime-local"
                            aria-label={"date"}
                            value={begin}
                            onChange={e => {
                                setBegin(e.target.value)
                                setSubmitDisabled(false)
                            }}
                            size={"lg"}
                        />
                    </Form.Group>
                    <div style={{color: "red", fontSize: 15}} id="price_err_msg"></div>
                    <Form.Group className="mb-1">
                        <Form.Label className="d-flex">Продолжительность (в минутах)</Form.Label>
                        <Form.Control
                            value={duration}
                            onChange={e => {
                                setDuration(e.target.value)
                                setSubmitDisabled(false)
                            }}
                            className="mt-3"
                            placeholder="Введите продолжительность"
                        />
                    </Form.Group>
                    <div style={{color: "red", fontSize: 15}} id="duration_err_msg"></div>
                    <div style={{color: "red", fontSize: 15}} id="schedule_msg"></div>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button disabled={submitDisabled} variant="outline-success" onClick={() => {
                    clearErrors()
                    click()
                }}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default EditSchedule;