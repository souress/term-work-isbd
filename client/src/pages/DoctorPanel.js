import React, {useState} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import "./css/admPanel.css"

const DoctorPanel = () => {
    return (<Container className="d-flex flex-column">
            <Row>
                <Col style={{paddingLeft: 100}}>
                    <Col>
                        <Button id="adm_button" type={"button"} variant="secondary" className="mt-4 p-2"
                                onClick={() => console.log("true")} style={{width: 500}}>
                            Рационы питания
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
                </Col>
            </Row>
        </Container>
    );
};

export default DoctorPanel;