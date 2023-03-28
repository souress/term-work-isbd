import React, {useState} from 'react';
import {Button, Container} from "@nextui-org/react";
import "./css/admPanel.css"
import EditArtist from "../components/modals/EditArtist";
import EditLabel from "../components/modals/EditLabel";
import EditSchedule from "../components/modals/EditSchedule";

const ModeratorPanel = () => {
    const [artistVisible, setArtistVisible] = useState(false)
    const [labelVisible, setLabelVisible] = useState(false)
    const [scheduleVisible, setScheduleVisible] = useState(false)

    return (<Container className="d-flex  justify-content-center">
            <EditArtist show={artistVisible} onHide={() => setArtistVisible(false)}/>
            <EditLabel show={labelVisible} onHide={() => setLabelVisible(false)}/>
            <EditSchedule show={scheduleVisible} onHide={() => setScheduleVisible(false)}/>
            <Button.Group size="xl" className={"align-self-center"} vertical={true} color={"secondary"} flat>
                <Button type={"button"} onClick={() => setArtistVisible(true)} style={{width: 500}}>
                    Артисты
                </Button>
                <Button type={"button"} onClick={() => setLabelVisible(true)} style={{width: 500}}>
                    Лейблы
                </Button>
                <Button  type={"button"} onClick={() => setScheduleVisible(true)} style={{width: 500}}>
                    Расписание
                </Button>
            </Button.Group>
        </Container>
    );
};

export default ModeratorPanel;