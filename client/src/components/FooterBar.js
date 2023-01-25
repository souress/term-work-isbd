import React from 'react';
import {Col, Nav, Navbar, Row} from "react-bootstrap";

const FooterBar = () => {
    return (<Navbar id="footer" bg="light" style={{position: "fixed", bottom: 0, width: "100%", height: 25}}>
            <Nav className="justify-content-end" style={{width: "100%"}}>
                <Row className="m-lg-1">
                    <Col className="d-flex align-self-end">
                        <a href={"https://github.com/souress"}>github.com/souress</a>
                    </Col>
                </Row>
            </Nav>
        </Navbar>

    );
};

export default FooterBar;