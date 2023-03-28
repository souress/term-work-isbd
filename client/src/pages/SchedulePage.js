import React, {useContext, useEffect, useState} from 'react';
import {Card, Row} from "react-bootstrap";
import {Context} from "../index";
import {Button, Table} from "@nextui-org/react";
import {buyTicket, getAllSchedules} from "../http/concertAPI";

const SchedulePage = () => {
    const {person} = useContext(Context)
    const columns = [
        {key: "artist", label: "Артист"},
        {key: "place", label: "Помещение"},
        {key: "price", label: "Цена билета"},
        {key: "begin", label: "Дата начала"},
        {key: "duration", label: "Продолжительность в минутах"},
        {key: "buy", label: "Действие"}
    ];
    const [schedules, setSchedules] = useState([])

    const fetchSchedules = () => {
        getAllSchedules().then((r) => {
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

    useEffect(() => {
        fetchSchedules()
    }, []);

    const callBuyTicket = (scheduleId, price) => {
        if (person.balance >= price) {
            person.schedule.push(scheduleId)
            buyTicket(scheduleId, person.id).then((r) => {
                console.log(r)
            })
            fetchSchedules()
        } else  {
            alert("Not enough money")
        }
    }

    return (<Row className="g-0">
        <Row>
            <Card className="align-items-center" style={{marginLeft: 10}}><h2>Расписание</h2></Card>
        </Row>
        <Row>
            <Card style={{marginLeft: 10}}>
                <Button onPress={fetchSchedules}>Обновить</Button>
                <Table
                    aria-label="Schedule"
                    css={{
                        height: "auto",
                        minWidth: "100%",
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
                                {(columnKey) => {
                                    if (columnKey !== "buy") {
                                        return <Table.Cell>{item[columnKey]}</Table.Cell>
                                    } else if (!person.schedule.includes(item.id)) {
                                        return <Table.Cell>
                                            <Button onPress={() => callBuyTicket(item.id, item.price)}>
                                                Купить
                                            </Button>
                                        </Table.Cell>
                                    } else {
                                        return <Table.Cell>Билет куплен</Table.Cell>
                                    }
                                }}
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
            </Card>
        </Row>
    </Row>);
};

export default SchedulePage;