import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import "react-widgets/styles.css";
import {addLabel} from "../../http/concertAPI";

const EditLabel = observer(({show, onHide}) => {
    const [name, setName] = useState('')
    const [submitDisabled, setSubmitDisabled] = useState(false)

    const validate = (property, value) => {
        switch (property) {
            case 'name':
                return value.trim().length !== 0 && value !== ''
            default:
                return false
        }
    }

    const validateForm = () => {
        let valid = true
        if (!validate('name', name)){
            document.getElementById("name_err_msg").innerHTML +=
                "<br/>Название лэйбла не может быть пустым"
            valid = false
        }
        return valid
    }

    const click = () => {
        let validationResult = validateForm()
        setSubmitDisabled(validationResult)
        if (validationResult) {
            let label = {name}
            addLabel(label).then(() => {
                    document.getElementById("label_msg").textContent = "Лэйбл добавлен"
                }).catch(error => {
                    document.getElementById("label_msg").textContent = error.response.data.errorCode
                })
        }
    }

    const clearErrors = () => {
        document.getElementById("name_err_msg").innerHTML = ''
        document.getElementById("label_msg").textContent = ''

    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Лэйблы
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-1">
                        <Form.Label className="d-flex">Название лэйбла</Form.Label>
                        <Form.Control
                            value={name}
                            onChange={e => {
                                setName(e.target.value)
                                setSubmitDisabled(false)
                            }}
                            className="mt-3"
                            placeholder="Введите название лэйбла"
                        />
                    </Form.Group>
                    <div style={{color: "red", fontSize: 15}} id="name_err_msg"></div>
                    <div style={{color: "red", fontSize: 15}} id="label_msg"></div>
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

export default EditLabel;