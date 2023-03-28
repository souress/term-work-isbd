import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {addUser, getAllUsers, getRoles, updateUser} from "../../http/userAPI";
import isStrongPassword from "validator/es/lib/isStrongPassword";
import {Container} from "@nextui-org/react";
import DropdownList from "react-widgets/DropdownList";
import {getAllPersons} from "../../http/personAPI";

const EditUser = observer(({show, onHide}) => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [repeatedPassword, setRepeatedPassword] = useState('')
    const [role, setRole] = useState('')
    const [roles, setRoles] = useState([])
    const [submitDisabled, setSubmitDisabled] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const [users, setUsers] = useState([])
    const [persons, setPersons] = useState([])
    const [user, setUser] = useState('')
    const [person, setPerson] = useState('')

    const fetchUsers = () => {
        getAllUsers().then((r) => {
            setUsers(r.map(x => {
                return `${x.login} #${x.id}`
            }))
        })
    }
    const fetchRoles = () => {
        getRoles().then((r) => {
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

    const validate = async (property, value) => {
        switch (property) {
            case 'login':
                return value.length >= 5 && value.length <= 15 && value !== ''
            case 'password':
                return value !== ''
            case 'repeatedPassword':
                return value === password && value !== ''
        }
    }

    const validateForm = (update) => {
        let valid = true
        if (!update){
            validate('login', login).then(r => {
                if (!r) {
                    document.getElementById("login_err_msg").innerHTML +=
                        "<br/>Имя пользователя не может быть пустым" +
                        " и должно быть длиной от 5 до 15 символов"
                    valid = false
                }
            })
        }
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
        return valid
    }

    const click = (update = false) => {
        let validationResult = validateForm(update)
        setSubmitDisabled(validationResult)
        if (validationResult) {
            if (!update) {
                let user = {login, password, role}
                addUser(user)
                    .then((response) => {
                        document.getElementById("reg_msg").textContent = "Пользователь добавлен"
                    }).catch((error) => {
                    document.getElementById("reg_err_msg").textContent = error.response.data.errorCode
                })
            } else {
                let arr = user.split('#')
                let id = arr[arr.length - 1]
                arr.pop()
                arr.join('').trim()
                let arr2 = person.split('#')
                let id2 = arr2[arr2.length - 1]
                let userReq = {id, login: arr[0].trim(), password, role, person: id2}
                console.log(userReq)
                updateUser(userReq)
                    .then((response) => {
                        document.getElementById("reg_msg").textContent = "Пользователь добавлен"
                    }).catch((error) => {
                    document.getElementById("reg_err_msg").textContent = error.response.data.errorCode
                })
            }
        }
    }

    const clearErrors = (update = false) => {
        document.getElementById("login_err_msg").innerHTML = ''
        document.getElementById("pass_err_msg").innerHTML = ''
        document.getElementById("rep_pass_err_msg").innerHTML = ''
        document.getElementById("role_err_msg").innerHTML = ''
        document.getElementById("reg_err_msg").textContent = ''
        document.getElementById("reg_msg").textContent = ''
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            {!isUpdate &&
                <Container>
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Добавить пользователя
                        </Modal.Title>
                        <Button variant={"outline-info"} onClick={() => setIsUpdate(true)}>Переключить режим</Button>
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
                            <div style={{color: "red", fontSize: 15}} id="role_err_msg"></div>
                            <hr/>
                            <Form.Group className="mb-1">
                                <Form.Label className="d-flex">Человек</Form.Label>
                                <DropdownList
                                    value={persons}
                                    onChange={(nextValue) => {
                                        clearErrors()
                                        setPerson(nextValue)
                                        setSubmitDisabled(false)
                                    }}
                                    onClick={fetchPersons}
                                    data={persons}
                                    placeholder={"Выберите человека"}
                                />
                            </Form.Group>
                            <div style={{color: "red", fontSize: 15}} id="reg_err_msg"></div>
                            <div style={{color: "green", fontSize: 15}} id="reg_msg"></div>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                        <Button disabled={submitDisabled} variant="outline-success" onClick={() => {
                            clearErrors();
                            click()
                        }}>Добавить</Button>
                    </Modal.Footer>
                </Container>
            }
            {isUpdate &&
                <Container>
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Изменить пользователя
                        </Modal.Title>
                        <Button variant={"outline-info"} onClick={() => setIsUpdate(false)}>Переключить режим</Button>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-1">
                                <Form.Label className="d-flex">Пользователь</Form.Label>
                                <DropdownList
                                    value={user}
                                    onChange={(nextValue) => {
                                        clearErrors()
                                        setUser(nextValue)
                                        setSubmitDisabled(false)
                                    }}
                                    onClick={fetchUsers}
                                    data={users}
                                    placeholder={"Выберите пользователя"}
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
                            <div style={{color: "red", fontSize: 15}} id="role_err_msg"></div>
                            <hr/>
                            <Form.Group className="mb-1">
                                <Form.Label className="d-flex">Человек</Form.Label>
                                <DropdownList
                                    value={person}
                                    onChange={(nextValue) => {
                                        clearErrors()
                                        setPerson(nextValue)
                                        setSubmitDisabled(false)
                                    }}
                                    onClick={fetchPersons}
                                    data={persons}
                                    placeholder={"Выберите человека"}
                                />
                            </Form.Group>
                            <div style={{color: "red", fontSize: 15}} id="reg_err_msg"></div>
                            <div style={{color: "green", fontSize: 15}} id="reg_msg"></div>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                        <Button disabled={submitDisabled} variant="outline-success" onClick={
                            () => {
                                clearErrors();
                                click(true)
                            }}>
                            Добавить
                        </Button>
                    </Modal.Footer>
                </Container>
            }
        </Modal>
    );
});

export default EditUser;