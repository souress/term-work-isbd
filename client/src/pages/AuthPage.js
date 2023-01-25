import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";
import {CAB_ROUTE, REG_ROUTE} from "../utils/const";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {useHistory} from "react-router-dom";
import {checkAdmin, loginFunc} from "../http/userAPI";
import axios from "../axiosAPI";


const AuthPage = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory()
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        try {
            let data = await loginFunc(login, password);
            const user1 = {login: login, password: password}
            user.setUser(user1)
            user.setIsAuth(true)
            checkAdmin(user.user.login).then((response) => {
                user.setIsAdmin(response.data)
                history.push(CAB_ROUTE)
            })
        } catch (e) {
            alert(e)
        }

    }

    return (<Container className="d-flex justify-content-center align-items-center"
                       style={{height: window.innerHeight - 123}}>
        <Card style={{width: 600, paddingTop: 100}} className="p-5">
            <h2 className="m-auto">Вход</h2>
            <Form className="d-flex flex-column">
                <h5 className="mt-5">Имя пользователя</h5>
                <Form.Control id="log_login" className="mb-4" placeholder="Введите имя"
                              type="login" onChange={e => setLogin(e.target.value)}></Form.Control>
                <div id="log_err_msg" style={{color: "red"}}></div>
                <h5 className="mt-4">Пароль</h5>
                <Form.Control id="log_pass" className="mb-4" placeholder="Введите пароль"
                              type="password" onChange={e => setPassword(e.target.value)}></Form.Control>
                <Button className="w-20 align-self-center" variant="secondary" color="gray"
                        onClick={() => {
                            click()
                        }}>Вход</Button>
                <a onClick={() => {
                    history.push(REG_ROUTE)
                }} className="align-self-center mt-3 mb-3"
                   style={{fontSize: 17, color: "black", textDecoration: "none", cursor: "pointer"}}>У меня нет
                    аккаунта</a>
            </Form>
        </Card>
    </Container>);
});

export default AuthPage;