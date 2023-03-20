import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import DropdownList from "react-widgets/DropdownList";
import "react-widgets/styles.css";
import {addArtist, getAllLabels} from "../../http/concertAPI";
import {Checkbox} from "@nextui-org/react";

const EditArtist = observer(({show, onHide}) => {
    const [name, setName] = useState('')
    const [label, setLabel] = useState('')
    const [labels, setLabels] = useState([])
    const [submitDisabled, setSubmitDisabled] = useState(false)
    const [checkbox, setCheckbox] = useState(false)

    const fetchLabels = () => {
        getAllLabels().then((r) => {
            console.log(r)
            setLabels(r.map(x => x.name))
        })
    }

    const validate = (property, value) => {
        switch (property) {
            case 'name':
                return value.trim().length !== 0 && value !== ''
            case 'label':
                return labels.includes(value)
            default:
                return false
        }
    }

    const validateForm = () => {
        let valid = true
        if (!validate('name', name)){
            document.getElementById("name_err_msg").innerHTML +=
                "<br/>Имя артиста не может быть пустым"
            valid = false
        }
        if (!validate('label', label) && checkbox){
            document.getElementById("label_err_msg").innerHTML +=
                "<br/>Выберите значение из списка!"
            valid = false
        }
        return valid
    }

    const click = () => {
        let validationResult = validateForm()
        setSubmitDisabled(validationResult)
        if (validationResult) {
            if (checkbox) {
                let labelObj = {label}
                let artist = {name, labelObj}
                addArtist(artist).then((r) => {
                    console.log(r)
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

    const clearErrors = () => {
        document.getElementById("name_err_msg").innerHTML = ''
        document.getElementById("label_err_msg").innerHTML = ''
        document.getElementById("artist_msg").textContent = ''
        document.getElementById("artist_err_msg").textContent = ''

    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Артисты
                </Modal.Title>
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
                                placeholder={"Выберите название лэйбла"}
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
                    click()
                }}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default EditArtist;