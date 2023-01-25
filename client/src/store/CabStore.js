import {makeAutoObservable} from "mobx";

export default class CabStore {
    constructor() {
        this._userLogin = ""
        this._prod = []
        makeAutoObservable(this)
    }

    get userLogin() {
        return this._userLogin;
    }

    setUserLogin(value) {
        this._userLogin = value;
    }

    get prod() {
        return this._prod;
    }
}

