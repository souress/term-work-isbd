import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._isAdmin = false
        this._role = ""
        this._user = {login: '', password: ''}
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }

    setRole(role) {
        this._role = role
    }

    setIsAdmin(bool) {
        this._isAdmin = bool
    }

    setUser(user) {
        this._user = user
    }

    get isAuth() {
        return this._isAuth
    }

    get role() {
        return this._role
    }

    get isAdmin() {
        return this._isAdmin
    }

    get user() {
        return this._user
    }
}
