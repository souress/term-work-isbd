import React, {useContext, useState} from 'react';
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {CAB_ROUTE, LOGIN_ROUTE} from "../utils/const";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {useHistory} from "react-router-dom";
import {registerFunc} from "../http/userAPI";


const RegPage = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory()
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        let checkBox = document.getElementById('reg_check')
        let login_element = document.getElementById("reg_login")
        let password_element = document.getElementById("reg_pass")
        let passwordRep = document.getElementById("reg_pass_rep")
        let errorMessage = document.getElementById("reg_err_msg")
        if (login_element.value === '') {
            errorMessage.textContent = "Имя пользователя не может быть пустым"
        } else if (login_element.value.length < 5 || login_element.value.length > 15) {
            errorMessage.textContent = "Имя пользователя должно быть длиной от 5 до 15 символов"
        } else if (password_element.value !== passwordRep.value) {
            errorMessage.textContent = "Пароли должны совпадать"
        } else
            //     if (!validator.isStrongPassword(document.getElementById("reg_pass").value, {minSymbols: 0})) {
            //         document.getElementById("reg_err_msg").textContent = "Password must consist of one lowercase, uppercase letter and number, at least 8 characters"
            // } else
        if (!checkBox.checked) {
            document.getElementById("reg_err_msg").textContent = "Необходимо подтвердить согласие с политикой обработки персональных данных"
        } else {
            await registerFunc(login, password)
            user.setUser({login: login, password: password})
            user.setIsAuth(true)
            history.push(CAB_ROUTE)
        }
    }
    return (<Container className="d-flex justify-content-center align-items-center" style={{height: window.innerHeight - 200}}>
        <Card style={{width: 500, marginTop: 80}} className="p-5">
            <h2 className="m-auto">Регистрация</h2>
            <Form className="d-flex flex-column">
                <h5 className="mt-0">Имя пользователя</h5>
                <Form.Control className="mb-3" id="reg_login" placeholder="Введите имя" type="login" onChange={e => setLogin(e.target.value)}></Form.Control>
                <h5>Придумайте пароль</h5>
                <Form.Control className="mb-3" id="reg_pass" placeholder="Введите пароль" type="password" onChange={e => setPassword(e.target.value)}></Form.Control>
                <h5>Повторите пароль</h5>
                <Form.Control className="mb-3" id="reg_pass_rep" placeholder="Повторите ваш пароль" type="password"></Form.Control>
                <div style={{color: "red", fontSize: 20}} id="reg_err_msg"></div>
                <Row>
                    <Col md={1}><input id="reg_check" type="checkbox"/></Col>
                    <Col><h6>Я согласен с <a href="https://www.securitycode.ru/personal-data/"
                    style={{color: "lightblue"}}> политикой обработки персональных данных</a></h6>
                    </Col>
                </Row>
                <Button className="w-20 align-self-center" variant="secondary" color="gray" onClick={() => {document.getElementById("reg_err_msg").textContent = ""; click()}}>
                    Зарегистрироваться
                </Button>
                <a href={LOGIN_ROUTE} className="align-self-center mt-3 mb-3" style={{fontSize: 18, color: "black", textDecoration: "none"}}>
                    У меня есть аккаунт
                </a>
            </Form>
        </Card>
    </Container>);
});

export default RegPage;