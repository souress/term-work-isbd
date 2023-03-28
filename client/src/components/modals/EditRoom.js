import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import "react-widgets/styles.css";
import DropdownList from "react-widgets/DropdownList";
import {addRoom, getRoomTypes} from "../../http/roomAPI";

const EditRoom = observer(({show, onHide}) => {
    const [roomType, setRoomType] = useState('')
    const [roomTypes, setRoomTypes] = useState([])
    const [submitDisabled, setSubmitDisabled] = useState(false)

    const fetchRoomTypes = () => {
        getRoomTypes().then((r) => {
            setRoomTypes(r)
        })
    }

    const validate = (property, value) => {
        switch (property) {
            case 'roomType':
                return roomTypes.includes(value)
            default:
                return false
        }
    }

    const validateForm = () => {
        let valid = true
        if (!validate('roomType', roomType)){
            document.getElementById("roomType_err_msg").innerHTML +=
                "<br/>Выберите значение из списка!"
            valid = false
        }
        return valid
    }

    const click = () => {
        let validationResult = validateForm()
        setSubmitDisabled(validationResult)
        if (validationResult) {
            let room = {roomType}
            addRoom(room).then(() => {
                document.getElementById("room_msg").textContent = "Помещение добавлено"
            }).catch(error => {
                document.getElementById("room_msg").textContent = error.response.data.errorCode
            })
        }
    }

    const clearErrors = () => {
        document.getElementById("roomType_err_msg").innerHTML = ''
        document.getElementById("room_msg").textContent = ''

    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Помещения
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-1">
                        <Form.Label className="d-flex">Тип помещения</Form.Label>
                        <DropdownList
                            value={roomType}
                            onChange={(nextValue) => {
                                clearErrors()
                                setRoomType(nextValue)
                                setSubmitDisabled(false)
                            }}
                            onClick={fetchRoomTypes}
                            data={roomTypes}
                            placeholder={"Выберите тип помещения"}
                        />
                    </Form.Group>
                    <div style={{color: "red", fontSize: 15}} id="roomType_err_msg"></div>
                    <div style={{color: "red", fontSize: 15}} id="room_msg"></div>
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

export default EditRoom;