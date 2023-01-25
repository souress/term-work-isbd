import React, {useContext, useEffect, useState} from "react";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import FooterBar from "./components/FooterBar";
import {check} from "./http/userAPI";
import {Spinner} from "react-bootstrap";
import {Context} from "./index";

const App = () => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        check(user.user.login).then(data => {
            if (data === 0) {

            } else {
                user.setIsAuth(true)
            }

        }).finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <Spinner className="align-self-center" animation={"grow"}/>
    }
    return (<BrowserRouter>
        <NavBar/>
        <AppRouter/>
        <FooterBar/>
    </BrowserRouter>);

};

export default App;
