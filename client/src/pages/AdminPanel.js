import React, {useState} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import "./css/admPanel.css"
import EditUser from "../components/modals/EditUser";
import EditArtist from "../components/modals/EditArtist";
import EditRoom from "../components/modals/EditRoom";
import EditPerson from "../components/modals/EditPerson";
import EditSchedule from "../components/modals/EditSchedule";
import EditLabel from "../components/modals/EditLabel";

const AdminPanel = () => {
    const [userVisible, setUserVisible] = useState(false)
    const [artistVisible, setArtistVisible] = useState(false)
    const [roomVisible, setRoomVisible] = useState(false)
    const [personVisible, setPersonVisible] = useState(false)
    const [scheduleVisible, setScheduleVisible] = useState(false)
    const [labelVisible, setLabelVisible] = useState(false)


    return (<Container className="d-flex justify-content-center align-items-center">
            <Row>
                <Col style={{}}>
                    <Col>
                        <Button id="adm_button" type={"button"} className="mt-4 p-2"
                                onClick={() => setArtistVisible(true)} style={{width: 500}}>
                            Артисты
                        </Button>
                        <EditArtist show={artistVisible} onHide={() => setArtistVisible(false)}/>
                    </Col>
                    <Col>
                        <Button id="adm_button" type={"button"} className="mt-4 p-2"
                                onClick={() => setUserVisible(true)} style={{width: 500}}>
                            Пользователи
                        </Button>
                        <EditUser show={userVisible} onHide={() => setUserVisible(false)}/>
                    </Col>
                    <Col>
                        <Button id="adm_button" type={"button"} className="mt-4 p-2"
                                onClick={() => setPersonVisible(true)} style={{width: 500}}>
                            Люди
                        </Button>
                        <EditPerson show={personVisible} onHide={() => setPersonVisible(false)}/>
                    </Col>
                    <Col>
                        <Button id="adm_button" type={"button"} className="mt-4 p-2"
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
                        <Button id="adm_button" type={"button"} className="mt-4 p-2"
                                onClick={() => setLabelVisible(true)} style={{width: 500}}>
                            Лейблы
                        </Button>
                        <EditLabel show={labelVisible} onHide={() => setLabelVisible(false)}/>
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
                        <Button id="adm_button" type={"button"} className="mt-4 p-2"
                                onClick={() => setScheduleVisible(true)} style={{width: 500}}>
                            Расписание
                        </Button>
                        <EditSchedule show={scheduleVisible} onHide={() => setScheduleVisible(false)}/>

                    </Col>
                </Col>
            </Row>
        </Container>
    );
};

export default AdminPanel;