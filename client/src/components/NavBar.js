import React, {useContext} from 'react';
import {Button, Image, Nav, Navbar, NavItem} from "react-bootstrap";
import {
    ADMIN_ROUTE,
    CONTACTS_ROUTE,
    CAB_ROUTE,
    LOGIN_ROUTE, SCHEDULE_ROUTE, DOCTOR_ROUTE, MODERATOR_ROUTE
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
        localStorage.clear()
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
                { user.role.valueOf() === "PATIENT" &&
                    <NavItem>
                    <Button variant="secondary" style={{marginRight: 10}} onClick={() => {
                        history.push(CAB_ROUTE)
                    }}>
                        Личный кабинет
                    </Button>
                        <Button variant="secondary" style={{marginRight: 10}} onClick={() => {
                            history.push(SCHEDULE_ROUTE)
                        }}>
                            Расписание
                        </Button>
                </NavItem>
                }
                {(user.isAdmin === "true") &&
                    <NavItem>
                        <Button variant="secondary" onClick={() => {
                            history.push(ADMIN_ROUTE)
                        }}>
                            Админ панель
                        </Button>
                    </NavItem>
                }
                {user.role.valueOf() === 'DOCTOR' &&
                    <NavItem>
                        <Button variant="secondary" onClick={() => {
                            history.push(DOCTOR_ROUTE)
                        }}>
                            Действия врача
                        </Button>
                    </NavItem>
                }
                {user.role.valueOf() === 'CONCERT_MODERATOR' &&
                    <NavItem>
                        <Button variant="secondary" onClick={() => {
                            history.push(MODERATOR_ROUTE)
                        }}>
                            Модерация
                        </Button>
                    </NavItem>
                }
            </Nav>
        }
        <Nav className="flex-column me-3">
            {!user.isAuth && <Nav className="justify-content-center me-auto" style={{marginLeft: 15}}>

                <NavItem>
                    <Button variant="secondary" onClick={() => {
                        history.push(LOGIN_ROUTE)
                    }} style={{width: 80, background: "green", marginRight: 10}}>Вход</Button>
                    <Button variant="secondary" style={{marginRight: 10}} onClick={() => {
                        history.push(CONTACTS_ROUTE)
                    }}>
                        Контакты
                    </Button>
                </NavItem>
            </Nav>
            }
            {user.isAuth && <div>
                <Button variant="secondary" style={{marginLeft: 10, background: "red"}} onClick={() => {
                    logout()
                    history.push(LOGIN_ROUTE)
                }}>Выход</Button>
            </div>}
        </Nav>
    </Navbar>);
});

export default NavBar;