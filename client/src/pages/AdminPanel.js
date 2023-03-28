import React, {useState} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import "./css/admPanel.css"
import EditUser from "../components/modals/EditUser";
import EditArtist from "../components/modals/EditArtist";
import EditRoom from "../components/modals/EditRoom";

const AdminPanel = () => {
    const [userVisible, setUserVisible] = useState(false)
    const [artistVisible, setArtistVisible] = useState(false)
    const [roomVisible, setRoomVisible] = useState(false)

    return (<Container className="d-flex justify-content-center align-items-center">
            <Row>
                <Col style={{}}>
                    <Col>
                        <Button id="adm_button" type={"button"} variant="secondary" className="mt-4 p-2"
                                onClick={() => setArtistVisible(true)} style={{width: 500}}>
                            Артисты
                        </Button>
                        <EditArtist show={artistVisible} onHide={() => setArtistVisible(false)}/>
                    </Col>
                    <Col>
                        <Button id="adm_button" type={"button"} variant="secondary" className="mt-4 p-2"
                                onClick={() => setUserVisible(true)} style={{width: 500}}>
                            Пользователи
                        </Button>
                        <EditUser show={userVisible} onHide={() => setUserVisible(false)}/>
                    </Col>
                    <Col>
                        <Button id="adm_button" type={"button"} variant="secondary" className="mt-4 p-2"
                                onClick={() => console.log("true")} style={{width: 500}}>
                            Люди
                        </Button>
                    </Col>
                    <Col>
                        <Button id="adm_button" type={"button"} variant="secondary" className="mt-4 p-2"
                                onClick={() => setRoomVisible(true)} style={{width: 500}}>
                            Помещения
                        </Button>
                        <EditRoom show={roomVisible} onHide={() => setRoomVisible(false)}/>
                    </Col>
                    <Col>
                        <Button id="adm_button" type={"button"} variant="secondary" className="mt-4 p-2"
                                onClick={() => console.log("true")} style={{width: 500}}>
                            Продукты
                        </Button>
                    </Col>
                    <Col>
                        <Button id="adm_button" type={"button"} variant="secondary" className="mt-4 p-2"
                                onClick={() => console.log("true")} style={{width: 500}}>
                            Лейблы
                        </Button>
                    </Col>
                </Col>
                <Col>
                    <Col>
                        <Button id="adm_button" type={"button"} variant="secondary" className="mt-4 p-2"
                                onClick={() => console.log("true")} style={{width: 500}}>
                            Поставщики
                        </Button>
                    </Col>
                    <Col>
                        <Button id="adm_button" type={"button"} variant="secondary" className="mt-4 p-2"
                                onClick={() => console.log("true")} style={{width: 500}}>
                            Лекарства
                        </Button>
                    </Col>
                    <Col>
                        <Button id="adm_button" type={"button"} variant="secondary" className="mt-4 p-2"
                                onClick={() => console.log("true")} style={{width: 500}}>
                            Склад лекарств
                        </Button>
                    </Col>
                    <Col>
                        <Button id="adm_button" type={"button"} variant="secondary" className="mt-4 p-2"
                                onClick={() => console.log("true")} style={{width: 500}}>
                            Программы лечения
                        </Button>
                    </Col>
                    <Col>
                        <Button id="adm_button" type={"button"} variant="secondary" className="mt-4 p-2"
                                onClick={() => console.log("true")} style={{width: 500}}>
                            Журнал
                        </Button>
                    </Col>
                    <Col>
                        <Button id="adm_button" type={"button"} variant="secondary" className="mt-4 p-2"
                                onClick={() => console.log("true")} style={{width: 500}}>
                            Расписание
                        </Button>
                    </Col>
                </Col>
            </Row>
        </Container>
    );
};

export default AdminPanel;