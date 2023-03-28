import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import DropdownList from "react-widgets/DropdownList";
import "react-widgets/styles.css";
import {Container} from "@nextui-org/react";
import {addPerson, getAllPersons, getPersonRoles, updatePerson} from "../../http/personAPI";
import {addArtist, updateArtist} from "../../http/concertAPI";

const EditPerson = observer(({show, onHide}) => {
    const [name, setName] = useState('')
    const [newName, setNewName] = useState('')
    const [role, setRole] = useState('')
    const [roles, setRoles] = useState([])
    const [persons, setPersons] = useState([])
    const [person, setPerson] = useState('')
    const [balance, setBalance] = useState(0)
    const [submitDisabled, setSubmitDisabled] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)

    const fetchRoles = () => {
        getPersonRoles().then((r) => {
            setRoles(r)
        })
    }
    const fetchPersons = () => {
        getAllPersons().then((r) => {
            setPersons(r.map(x => {
                return `${x.fullName} #${x.id}`
            }))
        })
    }

    const validate = (property, value) => {
        switch (property) {
            case 'name':
                return value.trim().length !== 0 && value !== ''
            case 'newName':
                return value.trim().length !== 0 && value !== ''
            case 'balance':
                return value >= 0
            default:
                return false
        }
    }

    const validateForm = (update) => {
        let valid = true
        if (update) {
            if (!validate('newName', newName)) {
                document.getElementById("new_name_err_msg").innerHTML +=
                    "<br/>Имя не может быть пустым"
                valid = false
            }
        } else {
            if (!validate('name', name)) {
                document.getElementById("name_err_msg").innerHTML +=
                    "<br/>Имя не может быть пустым"
                valid = false
            }
            if (!validate('balance', balance)) {
                document.getElementById("balance_err_msg").innerHTML +=
                    "<br/>Баланс должен быть больше нуля"
                valid = false
            }
        }
        return valid
    }

    const click = (update) => {
        let validationResult = validateForm(update)
        setSubmitDisabled(validationResult)
        if (validationResult) {
            if (update) {

                let arr = person.split('#')
                let id = arr[arr.length-1]
                let artistReq = {id: id, name: newName}
                let pe = {id: id, fullName: name, role, balance}
                updatePerson(pe).then(() => {
                    document.getElementById("person_msg").textContent = "Человек добавлен"
                }).catch(error => {
                    console.log(error)
                    document.getElementById("person_err_msg").textContent = error.response.data.errorCode
                })
            } else {
                let pe = {fullName: name, role, balance}
                addPerson(pe).then(() => {
                    document.getElementById("person_msg").textContent = "Человек добавлен"
                }).catch(error => {
                    document.getElementById("person_err_msg").textContent = error.response.data.errorCode
                })
            }
        }
    }

    const clearErrors = (update = false) => {
        if (update) {
            document.getElementById("new_name_err_msg").innerHTML = ''
        } else {
            document.getElementById("name_err_msg").innerHTML = ''
            document.getElementById("balance_err_msg").innerHTML = ''
        }
        document.getElementById("person_msg").textContent = ''
        document.getElementById("person_err_msg").textContent = ''
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            {!isUpdate &&
                <Container>
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Добавить человека
                        </Modal.Title>
                        <Button variant={"outline-info"} onClick={() => setIsUpdate(true)}>Переключить режим</Button>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-1">
                                <Form.Label className="d-flex">Имя человека</Form.Label>
                                <Form.Control
                                    value={name}
                                    onChange={e => {
                                        setName(e.target.value)
                                        setSubmitDisabled(false)
                                    }}
                                    className="mt-3"
                                    placeholder="Введите имя человека"
                                />
                            </Form.Group>
                            <div style={{color: "red", fontSize: 15}} id="name_err_msg"></div>
                            <hr/>
                            <Form.Group className="mb-1">
                                <Form.Label className="d-flex">Роль</Form.Label>
                                <DropdownList
                                    value={role}
                                    onChange={(nextValue) => {
                                        clearErrors()
                                        setRole(nextValue)
                                        setSubmitDisabled(false)
                                    }}
                                    onClick={fetchRoles}
                                    data={roles}
                                    placeholder={"Выберите роль"}
                                />
                            </Form.Group>
                            <hr/>
                            <Form.Group className="mb-1">
                                <Form.Label className="d-flex">Баланс</Form.Label>
                                <Form.Control
                                    value={balance}
                                    onChange={e => {
                                        setBalance(e.target.value)
                                        setSubmitDisabled(false)
                                    }}
                                    className="mt-3"
                                    placeholder="Введите баланс"
                                />
                            </Form.Group>
                            <div style={{color: "red", fontSize: 15}} id="balance_err_msg"></div>
                            <div style={{color: "red", fontSize: 15}} id="person_msg"></div>
                            <div style={{color: "red", fontSize: 15}} id="person_err_msg"></div>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                        <Button disabled={submitDisabled} variant="outline-success" onClick={() => {
                            clearErrors();
                            click(false)
                        }}>Добавить</Button>
                    </Modal.Footer>
                </Container>
            }
            {isUpdate &&
                <Container>
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Изменить человека
                        </Modal.Title>
                        <Button variant={"outline-info"} onClick={() => setIsUpdate(false)}>Переключить режим</Button>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-1">
                                <Form.Label className="d-flex">Человек</Form.Label>
                                <DropdownList
                                    value={person}
                                    onChange={(nextValue) => {
                                        clearErrors(true)
                                        setPerson(nextValue)
                                        setSubmitDisabled(false)
                                    }}
                                    onClick={fetchPersons}
                                    data={persons}
                                    placeholder={"Выберите человека"}
                                />
                            </Form.Group>
                            <hr/>
                            <Form.Group className="mb-1">
                                <Form.Label className="d-flex">Имя</Form.Label>
                                <Form.Control
                                    value={newName}
                                    onChange={e => {
                                        setNewName(e.target.value)
                                        setSubmitDisabled(false)
                                    }}
                                    className="mt-3"
                                    placeholder="Введите новое имя"
                                />
                            </Form.Group>
                            <div style={{color: "red", fontSize: 15}} id="new_name_err_msg"></div>

                            <hr/>
                            <Form.Group className="mb-1">
                                <Form.Label className="d-flex">Роль</Form.Label>
                                <DropdownList
                                    value={role}
                                    onChange={(nextValue) => {
                                        clearErrors()
                                        setRole(nextValue)
                                        setSubmitDisabled(false)
                                    }}
                                    onClick={fetchRoles}
                                    data={roles}
                                    placeholder={"Выберите роль"}
                                />
                            </Form.Group>
                            <hr/>
                            <Form.Group className="mb-1">
                                <Form.Label className="d-flex">Баланс</Form.Label>
                                <Form.Control
                                    value={balance}
                                    onChange={e => {
                                        setBalance(e.target.value)
                                        setSubmitDisabled(false)
                                    }}
                                    className="mt-3"
                                    placeholder="Введите баланс"
                                />
                            </Form.Group>
                            <div style={{color: "red", fontSize: 15}} id="balance_err_msg"></div>
                            <div style={{color: "red", fontSize: 15}} id="person_msg"></div>
                            <div style={{color: "red", fontSize: 15}} id="person_err_msg"></div>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                        <Button disabled={submitDisabled} variant="outline-success" onClick={() => {
                            clearErrors(true)
                            click(true)
                        }}>Добавить</Button>
                    </Modal.Footer>
                </Container>
            }
        </Modal>
    );
});

export default EditPerson;