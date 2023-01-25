import React, {useState} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import "./css/admPanel.css"

const AdminPanel = () => {
    return (<Container className="d-flex flex-column">
            <Row>
                <Col style={{paddingLeft: 100}}>
                    <Col>
                        <Button id="adm_button" type={"button"} variant="secondary" className="mt-4 p-2"
                                onClick={() => console.log("true")} style={{width: 500}}>
                            Добавить продукт
                        </Button>
                    </Col>
                    <Col>
                        <Button id="adm_button" type={"button"} variant="secondary" className="mt-4 p-2"
                                onClick={() => console.log("true")} style={{width: 500}}>
                            Изменить количество товара
                        </Button></Col>
                </Col>
                <Col style={{paddingRight: 50}}>
                    <Col>
                        <Button id="adm_button" type={"button"} variant="secondary" className="mt-4 p-2"
                                onClick={() => console.log("true")} style={{width: 500}}>
                            Изменить статус заказа
                        </Button>
                    </Col>
                    <Col>
                        <Button id="adm_button" type={"button"} variant="secondary" className="mt-4 p-2"
                                onClick={() => console.log("true")} style={{width: 500}}>
                            Добавить рыбу
                        </Button>
                    </Col>
                </Col>
            </Row>

        </Container>

    );
};

export default AdminPanel;