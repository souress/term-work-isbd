import React, {useContext, useEffect, useState} from 'react';
import {Card, Col} from "react-bootstrap";
import {Context} from "../index";
import {Container, Table} from "@nextui-org/react";
import {getSchedulesByIds} from "../http/concertAPI";

const CabPage = () => {
    const {person} = useContext(Context)
    const {user} = useContext(Context)
    const [schedules, setSchedules] = useState([])

    const columns = [
        {
            key: "artist",
            label: "Артист",
        },
        {
            key: "place",
            label: "Помещение",
        },
        {
            key: "price",
            label: "Цена билета",
        },
        {
            key: "begin",
            label: "Дата начала",
        },
        {
            key: "duration",
            label: "Продолжительность в минутах",
        }
    ];

    useEffect(() => {
        person.updatePerson(user.user.login)
        fetchSchedules()
    }, []);

    const fetchSchedules = () => {
        getSchedulesByIds(person.schedule.toString().split(',')).then((r) => {
            setSchedules(r.map(x => {
                let id = x.id
                let artist = `${x.artist.name} #${x.artist.id}`
                let place = `${x.room.roomType} #${x.room.id}`
                let price = x.price
                let begin = x.beginDatetime
                let duration = x.duration
                return {id, artist, place, price, begin, duration}
            }))
        })
    }

    return (
        <Container>
            <Card className="align-items-center" style={{marginLeft: 10}}><h2>Личный кабинет</h2></Card>

            <Card className={"align-items-center"} style={{marginLeft: 10}}>

                <Card className={"align-items-center"}
                      style={{
                          margin: 10, padding: 10,
                          backgroundColor: '#e4fde4', width: '50%'
                      }}>
                    <h4>Основная информация</h4>
                    <Col style={{width: '80%'}}>
                        Имя
                        <Card> {person.fullName}</Card>
                    </Col>
                    <Col style={{width: '80%'}}>Баланс
                        <Card> {person.balance}</Card>
                    </Col>
                </Card>
                <Card className={"align-items-center"}
                      style={{
                          margin: 10, padding: 10,
                          backgroundColor: '#e4fde4', width: '50%'
                      }}>
                    <h4>Лечение</h4>
                    <Col style={{width: '80%'}}>
                        Программа лечения
                        <Card> {} </Card>
                    </Col>
                    <Col style={{width: '80%'}}>
                        Диета
                        <Card> {} </Card>
                    </Col>
                </Card>

                <Table
                    aria-label="Schedule"
                    css={{
                        height: "auto",
                        width: "50%",
                        minWidth: "50%"
                    }}
                >
                    <Table.Header columns={columns}>
                        {(column) => (
                            <Table.Column key={column.key}>{column.label}</Table.Column>
                        )}
                    </Table.Header>
                    <Table.Body items={schedules}>
                        {(item) => (
                            <Table.Row key={item.id}>
                                {(columnKey) => <Table.Cell>{item[columnKey]}</Table.Cell>}
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
            </Card>
        </Container>
    );
};

export default CabPage;