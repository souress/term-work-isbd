import React, {useContext} from 'react';
import {Button, Card, Col, Row} from "react-bootstrap";
import {Context} from "../index";

const CabPage = () => {
    const {person} = useContext(Context)

    return (<Row className="g-0">
        <Row>
            <Card className="align-items-center" style={{marginLeft: 10}}><h2>Личный кабинет</h2></Card>
        </Row>
        <Row>
                <Card style={{marginLeft: 10}}>
                    <Card>Name: {person.fullName}</Card>
                    <Card>Balance: {person.balance}</Card>
                    <Card>Treatment program</Card>
                    <Card>Diet</Card>
                    <Card>Schedule: {person.schedules}</Card>
                </Card>
        </Row>
    </Row>);
};

export default CabPage;