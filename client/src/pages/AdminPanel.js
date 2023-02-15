import React, {useState} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import "./css/admPanel.css"
import EditUser from "../components/modals/EditUser";

const AdminPanel = (variant) => {
    const [userVisible, setUserVisible] = useState(false)
    //
    // if (variant) {
    //     setUserVisible(false)
    // }
    //
    // const handleClickUser = (reason) => {
    //     if (reason === 'clickaway') {
    //         return;
    //     }
    //     setUserVisible(false)
    //
    // };

    return (<Container className="d-flex flex-column">
            <Row>
                <Col style={{paddingLeft: 100}}>
                    <Col>
                        <Button id="adm_button" type={"button"} variant="secondary" className="mt-4 p-2"
                                onClick={() => console.log("true")} style={{width: 500}}>
                            Артисты
                        </Button>
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
                            Комнаты
                        </Button>
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
                <Col style={{paddingLeft: 50}}>
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
                </Col>
            </Row>
        </Container>
    );
};

export default AdminPanel;