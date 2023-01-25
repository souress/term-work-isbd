import React, {useContext} from 'react';
import {Card, Row} from "react-bootstrap";
import {Context} from "../index";

const CabPage = () => {
    return (<Row className="g-0">
        <Row>
            <Card className="align-items-center" style={{marginLeft: 10}}><h2>Личный кабинет</h2></Card>
        </Row>
    </Row>);
};

export default CabPage;