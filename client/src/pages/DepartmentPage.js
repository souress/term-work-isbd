import React, {useContext} from 'react';
import {Card, Col, Row} from "react-bootstrap";
import {Context} from "../index";

const DepartmentPage = () => {
    return (<Row className="g-0">
        <Row>
            <Card className="align-items-center" style={{marginLeft: 10}}><h2>Department</h2></Card>
        </Row>
        <Row>
            <Card style={{marginLeft: 10}}>
                <Card>Photo</Card>
                <Card>Name</Card>
                <Card>Balance</Card>
                <Card>Treatment program</Card>
                <Card>Diet</Card>
                <Card>Schedule</Card>
            </Card>
        </Row>
    </Row>);
};

export default DepartmentPage;