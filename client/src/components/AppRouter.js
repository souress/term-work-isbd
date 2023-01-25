import React, {useContext} from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import {adminRoutes, publicRoutes} from "../routes";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {LOGIN_ROUTE} from "../utils/const";

const AppRouter = observer(() => {
    const {user} = useContext(Context)
    let isAdmin = user.isAdmin

    return (
        <Switch>
            {
                publicRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} component={Component} exact/>)
            }
            {
                isAdmin === true && adminRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact/>)
            }
            <Redirect to={LOGIN_ROUTE}/>
        </Switch>
    );
});

export default AppRouter;