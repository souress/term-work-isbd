import React, {useContext, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Dropdown, Form, Row, Col} from "react-bootstrap";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {addUser, getRoles} from "../../http/userAPI";
import isStrongPassword from "validator/es/lib/isStrongPassword";
import jwtDecode from "jwt-decode";

const EditUser = observer(({show, onHide}) => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [repeatedPassword, setRepeatedPassword] = useState('')
    const [role, setRole] = useState('')
    const [submitDisabled, setSubmitDisabled] = useState(false)

    const validate = async (property, value) => {
        switch (property) {
            case 'login':
                return value.length >= 5 && value.length <= 15 && value !== ''
            case 'password':
                return isStrongPassword(value, {
                    minLength: 8, minLowercase: 1,
                    minUppercase: 1, minNumbers: 1
                })
            case 'repeatedPassword':
                return value === password && value !== ''
            case 'role':
                return getRoles().then(r =>{
                    return r.includes(value)
                })
        }
    }

    const validateForm = () => {
        let valid = true
        validate('login', login).then(r => {
            if (!r) {
                document.getElementById("login_err_msg").innerHTML +=
                    "<br/>Имя пользователя не может быть пустым" +
                    " и должно быть длиной от 5 до 15 символов"
                valid = false
            }
        })
        validate('password', password).then(r => {
            if (!r) {
                document.getElementById("pass_err_msg").innerHTML +=
                    "<br/>Пароль должен включать как минимум одну lowercase," +
                    " одну uppercase букву, одно число и быть не менее 8 символов"
                valid = false
            }
        })
        validate('repeatedPassword', repeatedPassword).then(r => {
            if (!r) {
                document.getElementById("rep_pass_err_msg").innerHTML +=
                    "<br/>Пароли должны совпадать"
                valid = false
            }
        })
        validate('role', role).then(r => {
            if (!r) {
                document.getElementById("role_err_msg").innerHTML +=
                    "<br/>Введенная роль не найдена"
                valid = false
            }
        })
        return valid
    }

    const click = () => {
        setSubmitDisabled(validateForm())
        let user = {login, password, role}
        addUser(user)
            .then((response) => {
                document.getElementById("reg_msg").textContent = "Пользователь добавлен"
            }).catch((error) => {
            document.getElementById("reg_err_msg").textContent = error.response.data.errorCode
        })
    }

    const clearErrors = () => {
        document.getElementById("login_err_msg").innerHTML = ''
        document.getElementById("pass_err_msg").innerHTML = ''
        document.getElementById("rep_pass_err_msg").innerHTML = ''
        document.getElementById("role_err_msg").innerHTML = ''
        document.getElementById("reg_err_msg").textContent = ''
        document.getElementById("reg_msg").textContent = ''
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Пользователи
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-1">
                        <Form.Label className="d-flex">Имя пользователя</Form.Label>
                        <Form.Control
                            value={login}
                            onChange={e => {
                                setLogin(e.target.value)
                                setSubmitDisabled(false)
                            }}
                            className="mt-3"
                            placeholder="Введите имя пользователя"
                        />
                    </Form.Group>
                    <div style={{color: "red", fontSize: 15}} id="login_err_msg"></div>
                    <hr/>
                    <Form.Group className="mb-1">
                        <Form.Label className="d-flex">Пароль</Form.Label>
                        <Form.Control
                            value={password}
                            onChange={e => {
                                setPassword(e.target.value)
                                setSubmitDisabled(false)
                            }}
                            className="mt-3"
                            placeholder="Введите пароль"
                        />
                    </Form.Group>
                    <div style={{color: "red", fontSize: 15}} id="pass_err_msg"></div>
                    <br/>
                    <Form.Group className="mb-1">
                        <Form.Label className="d-flex">Повторите пароль</Form.Label>
                        <Form.Control
                            value={repeatedPassword}
                            onChange={e => {
                                setRepeatedPassword(e.target.value)
                                setSubmitDisabled(false)
                            }}
                            className="mt-3"
                            placeholder="Повторите пароль"
                        />
                    </Form.Group>
                    <div style={{color: "red", fontSize: 15}} id="rep_pass_err_msg"></div>
                    <hr/>
                    <Form.Group className="mb-1">
                        <Form.Label className="d-flex">Роль</Form.Label>
                        <Form.Control
                            value={role}
                            className="mt-3"
                            onChange={e => {
                                setRole(e.target.value)
                                setSubmitDisabled(false)
                            }}
                            placeholder="Введите роль"
                        />
                    </Form.Group>
                    <div style={{color: "red", fontSize: 15}} id="role_err_msg"></div>
                    <hr/>
                    <Form.Group className="mb-1">
                        <Form.Label className="d-flex">Человек</Form.Label>
                        <Form.Control
                            value={role}
                            className="mt-3"
                            onChange={e => {
                                setRole(e.target.value)
                                setSubmitDisabled(false)
                            }}
                            placeholder="Введите роль"
                        />
                    </Form.Group>
                    <div style={{color: "red", fontSize: 15}} id="role_err_msg"></div>
                    <div style={{color: "red", fontSize: 15}} id="reg_err_msg"></div>
                    <div style={{color: "green", fontSize: 15}} id="reg_msg"></div>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button disabled={submitDisabled} variant="outline-success" onClick={() => { clearErrors(); click()}}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default EditUser;