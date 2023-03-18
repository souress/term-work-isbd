import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./input.css"
import UserStore from "./store/UserStore";
import CabStore from "./store/CabStore";
import PersonStore from "./store/PersonStore";

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Context.Provider value={{
        user: new UserStore(),
        cab: new CabStore(),
        person: new PersonStore()
    }}>
        <App/>
    </Context.Provider>);