import React from 'react';
import {Card, Col, Row} from "react-bootstrap";
import wpp_icon from "../assets/wpp_icon.webp"
import tg_icon from "../assets/tg_icon.png"
import phone_icon from "../assets/phone_icon.png"
import mail_icon from "../assets/mail_icon.png"

const ContactPage = () => {
    return (<div style={{}} className="align-content-center">
        <Row className="g-0 align-items-center">
            <Card className="align-self-center" style={{}}>
                <h2 className="align-self-center">Контактные данные</h2>
            </Card>
        </Row>
        <Row className="g-0 justify-content-center">
            <Col md={2} style={{marginRight: 120, marginLeft: -80}}>
                <Card style={{width: 330, height: 535}}>
                    <Row><h1 className="text-center">Напишите нам</h1></Row>
                    <Row><h2 className="text-center" style={{padding: 30}}>
                        В нашем WhatsApp чате помогут разобраться с вашим вопросом</h2>
                    </Row>
                    <Row><a href="https://wa.me/77771235555" className="text-center"
                            style={{fontSize: 40, textDecoration: "none"}}>
                        WhatsApp</a>
                    </Row>
                    <Row className="justify-content-center">
                        <img className="align-self-center" src={wpp_icon} style={{width: 180}} alt=""/>
                    </Row>
                </Card>
            </Col>
            <Col md={2} style={{marginRight: 120}}>
                <Card style={{width: 330, height: 535}}>
                    <Row><h1 className="text-center">Напишите нам</h1></Row>
                    <Row><h2 style={{padding: 30}} className="text-center">Идеи? Предложения? Мы открыты для любых
                        вопросов!</h2></Row>
                    <Row><h4 className="text-center">
                        Написать на <a style={{textDecoration: "none"}} href="mailto:klimenkokirillm60@gmail.com">
                        klimenkokirillm60@gmail.com</a></h4>
                    </Row>
                    <Row className="justify-content-center">
                        <img src={mail_icon} className="align-self-center" style={{width: 180}} alt=""/>
                    </Row>
                </Card>
            </Col>
            <Col md={2} style={{marginRight: 120}}>
                <Card style={{width: 330, height: 535}}>
                    <Row><h1 className="text-center">Позвоните нам</h1></Row>
                    <Row><h2 className="text-center" style={{padding: 30}}>Есть вопросы? Мы поможем!</h2></Row>
                    <Row><a className="text-center" href="tel:+77771235555"
                            style={{fontSize: 35, textDecoration: "none"}}>
                        +7(777)123-55-55</a>
                    </Row>
                    <Row className="justify-content-center">
                        <img src={phone_icon} className="align-self-center" style={{width: 180}} alt=""/>
                    </Row>
                </Card>
            </Col>
            <Col md={2}>
                <Card style={{width: 330, height: 535}}>
                    <Row><h1 className="text-center">Напишите нам</h1></Row>
                    <Row>
                        <h2 className="text-center" style={{padding: 30}}>
                            В нашем telegram чате помогут разобраться с вашим вопросом</h2>
                    </Row>
                    <Row><a href="https://t.me/klmnkki" className="text-center"
                            style={{fontSize: 35, textDecoration: "none"}}>Телеграм</a></Row>
                    <Row className="justify-content-center">
                        <img src={tg_icon} className="align-self-center" style={{width: 180}} alt=""/>
                    </Row>
                </Card>
            </Col>
        </Row>
    </div>);
};

export default ContactPage;