import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import DropdownList from "react-widgets/DropdownList";
import "react-widgets/styles.css";
import {addArtist, getAllArtists, getAllLabels, updateArtist} from "../../http/concertAPI";
import {Checkbox, Container} from "@nextui-org/react";

const EditArtist = observer(({show, onHide}) => {
    const [name, setName] = useState('')
    const [newName, setNewName] = useState('')
    const [label, setLabel] = useState('')
    const [labels, setLabels] = useState([])
    const [artists, setArtists] = useState([])
    const [artist, setArtist] = useState('')
    const [submitDisabled, setSubmitDisabled] = useState(false)
    const [checkbox, setCheckbox] = useState(false)
    const [isUpdateArtist, setIsUpdateArtist] = useState(false)

    const fetchLabels = () => {
        getAllLabels().then((r) => {
            setLabels(r.map(x => x.name))
        })
    }

    const fetchArtists = () => {
        getAllArtists().then((r) => {
            setArtists(r.map(x => {
                return `${x.name} #${x.id}`
            }))
        })
    }

    const validate = (property, value) => {
        switch (property) {
            case 'name':
                return value.trim().length !== 0 && value !== ''
            case 'newName':
                return value.trim().length !== 0 && value !== ''
            case 'label':
                return labels.includes(value)
            default:
                return false
        }
    }

    const validateForm = (update) => {
        let valid = true
        if (update) {
            if (!validate('newName', newName)) {
                document.getElementById("new_name_err_msg").innerHTML +=
                    "<br/>Имя артиста не может быть пустым"
                valid = false
            }
        } else {
            if (!validate('name', name)) {
                document.getElementById("name_err_msg").innerHTML +=
                    "<br/>Имя артиста не может быть пустым"
                valid = false
            }
            if (!validate('label', label) && checkbox) {
                document.getElementById("label_err_msg").innerHTML +=
                    "<br/>Выберите значение из списка!"
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
                let arr = artist.split('#')
                let id = arr[arr.length-1]
                let artistReq = {id: id, name: newName}
                updateArtist(artistReq).then(() => {
                    document.getElementById("artist_msg").textContent = "Артист добавлен"
                }).catch(error => {
                    console.log(error)
                    document.getElementById("artist_err_msg").textContent = error.response.data.errorCode
                })
            } else {
                if (checkbox) {
                    let labelObj = {label}
                    let artist = {name, labelObj}
                    addArtist(artist).then((r) => {
                        document.getElementById("artist_msg").textContent = "Артист добавлен"
                    }).catch(error => {
                        console.log(error)
                        document.getElementById("artist_err_msg").textContent = error.response.data.errorCode
                    })
                } else {
                    let artist = {name}
                    addArtist(artist).then(() => {
                        document.getElementById("artist_msg").textContent = "Артист добавлен"
                    }).catch(error => {
                        console.log(error)
                        document.getElementById("artist_err_msg").textContent = error.response.data.errorCode
                    })
                }
            }
        }
    }

    const clearErrors = (update = false) => {
        if (update) {
            document.getElementById("new_name_err_msg").innerHTML = ''
        } else {
            document.getElementById("name_err_msg").innerHTML = ''
            document.getElementById("label_err_msg").innerHTML = ''
        }
        document.getElementById("artist_msg").textContent = ''
        document.getElementById("artist_err_msg").textContent = ''
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            {!isUpdateArtist &&
                <Container>
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Добавить артиста
                        </Modal.Title>
                        <Button variant={"outline-info"} onClick={() => setIsUpdateArtist(true)}>Переключить режим</Button>
                    </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group className="mb-1">
                                    <Form.Label className="d-flex">Имя артиста</Form.Label>
                                    <Form.Control
                                        value={name}
                                        onChange={e => {
                                            setName(e.target.value)
                                            setSubmitDisabled(false)
                                        }}
                                        className="mt-3"
                                        placeholder="Введите имя артиста"
                                    />
                                </Form.Group>
                                <div style={{color: "red", fontSize: 15}} id="name_err_msg"></div>
                                <hr/>
                                {checkbox &&
                                    <Form.Group className="mb-1">
                                        <Form.Label className="d-flex">Лэйбл</Form.Label>
                                        <DropdownList
                                            value={label}
                                            onChange={(nextValue) => {
                                                clearErrors()
                                                setLabel(nextValue)
                                                setSubmitDisabled(false)
                                            }}
                                            onClick={fetchLabels}
                                            data={labels}
                                            placeholder={"Выберите лэйбл"}
                                        />
                                    </Form.Group>
                                }
                                <div style={{color: "red", fontSize: 15}} id="label_err_msg"></div>
                                <Checkbox className={"d-flex"} size={"sm"} isSelected={checkbox} onChange={setCheckbox}
                                          onClick={() => {
                                              clearErrors()
                                          }}>приписать к лэйблу</Checkbox>

                                <div style={{color: "red", fontSize: 15}} id="artist_msg"></div>
                                <div style={{color: "red", fontSize: 15}} id="artist_err_msg"></div>
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
            {isUpdateArtist &&
                <Container>
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Изменить артиста
                        </Modal.Title>
                        <Button variant={"outline-info"} onClick={() => setIsUpdateArtist(false)}>Переключить режим</Button>
                    </Modal.Header>

                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-1">
                                <Form.Label className="d-flex">Артист</Form.Label>
                                <DropdownList
                                    value={artist}
                                    onChange={(nextValue) => {
                                        clearErrors(true)
                                        setArtist(nextValue)
                                        setSubmitDisabled(false)
                                    }}
                                    onClick={fetchArtists}
                                    data={artists}
                                    placeholder={"Выберите артиста"}
                                />
                            </Form.Group>
                            <hr/>
                            <Form.Group className="mb-1">
                                <Form.Label className="d-flex">Имя артиста</Form.Label>
                                <Form.Control
                                    value={newName}
                                    onChange={e => {
                                        setNewName(e.target.value)
                                        setSubmitDisabled(false)
                                    }}
                                    className="mt-3"
                                    placeholder="Введите новое имя артиста"
                                />
                            </Form.Group>
                            <div style={{color: "red", fontSize: 15}} id="new_name_err_msg"></div>
                            <div style={{color: "red", fontSize: 15}} id="artist_msg"></div>
                            <div style={{color: "red", fontSize: 15}} id="artist_err_msg"></div>
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

export default EditArtist;