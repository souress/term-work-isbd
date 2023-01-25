import React, {useContext, useState} from 'react';
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {CAB_ROUTE, LOGIN_ROUTE} from "../utils/const";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {useHistory} from "react-router-dom";
import {loginFunc, registerFunc} from "../http/userAPI";
import validator from "validator/es";


const RegPage = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory()
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        let checkBox = document.getElementById('reg_check')
        if (document.getElementById("reg_pass").value === '') {
            document.getElementById("reg_err_msg").textContent = "Name can't be empty"
        } else if (document.getElementById("reg_pass").value !== document.getElementById("reg_pass1").value) {
            document.getElementById("reg_err_msg").textContent = "Repeated password incorrectly"
        } else
        //     if (!validator.isStrongPassword(document.getElementById("reg_pass").value, {minSymbols: 0})) {
        //         document.getElementById("reg_err_msg").textContent = "Password must consist of one lowercase, uppercase letter and number, at least 8 characters"
        // } else
        if (!checkBox.checked) {
            document.getElementById("reg_err_msg").textContent = 'You need to accept personal data processing policies!'
        } else {
            try {
                let data;
                data = await registerFunc(login, password);
                const user1 = {login: login, password: password}
                user.setUser(user1)
                user.setIsAuth(true)
                history.push(CAB_ROUTE)
            } catch (e) {
                alert(e.response.data.message)
            }
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
                <Form.Control className="mb-3" id="reg_pass1" placeholder="Повторите ваш пароль" type="password"></Form.Control>
                <div style={{color: "red", fontSize: 20}} id="reg_err_msg"></div>
                <Row>
                    <Col md={1}><input id="reg_check" type="checkbox"/></Col>
                    <Col><h6>Я согласен с <a href="https://www.securitycode.ru/personal-data/"
                    style={{color: "lightblue"}}> политикой обработки персональных данных</a></h6>
                    </Col>
                </Row>
                <Button style={{background: "rgba(0, 0, 0, 0)", borderColor: "rgba(0, 0, 0, 0)"}} onClick={() => {click()}}>
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