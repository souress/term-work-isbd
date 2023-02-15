import React, {useContext} from 'react';
import {Button, Image, Nav, Navbar, NavItem, Row} from "react-bootstrap";
import {
    ADMIN_ROUTE,
    CONTACTS_ROUTE,
    CAB_ROUTE,
    LOGIN_ROUTE, SCHEDULE_ROUTE
} from "../utils/const";
import {NavLink, useHistory} from "react-router-dom";
import NavbarImg from "../assets/i.webp"
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory()

    const logout = () => {
        user.setUser({})
        user.setIsAuth(false)
    }
    return (
        <Navbar bg="light" variant="light">
        <NavLink style={{color: 'white', marginLeft: 7}} to={CONTACTS_ROUTE}><Image width={100} src={NavbarImg}/></NavLink>
        {user.isAuth &&
            <Nav className="justify-content-center me-auto" style={{marginLeft: 15}}>
                <NavItem>
                    <Button variant="secondary" style={{marginRight: 10}} onClick={() => {
                        history.push(CONTACTS_ROUTE)
                    }}>
                        Контакты
                    </Button>
                </NavItem>
                <NavItem>
                    <Button variant="secondary" style={{marginRight: 10}} onClick={() => {
                        history.push(CAB_ROUTE)
                    }}>
                        Личный кабинет
                    </Button>
                </NavItem>
                <NavItem>
                    <Button variant="secondary" style={{marginRight: 10}} onClick={() => {
                        history.push(SCHEDULE_ROUTE)
                    }}>
                        Расписание
                    </Button>
                </NavItem>
                {user.isAuth && user.isAdmin &&
                    <NavItem>
                        <Button variant="secondary" onClick={() => {
                            history.push(ADMIN_ROUTE)
                        }}>
                            Админ панель
                        </Button>
                    </NavItem>
                }
            </Nav>
        }
        <Nav className="flex-column me-3">
            {!user.isAuth && <div>
                <Button variant="secondary" onClick={() => {
                    history.push(LOGIN_ROUTE)
                }} style={{width: 80}}>Вход</Button>
            </div>}
            {user.isAuth && <div>
                <Button variant="secondary" style={{marginLeft: 10}} onClick={() => {
                    logout()
                    history.push(LOGIN_ROUTE)
                }}>Выход</Button>
            </div>}
        </Nav>
    </Navbar>);
});

export default NavBar;