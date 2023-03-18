import {makeAutoObservable} from "mobx";

export default class PersonStore {
    constructor() {
        this._fullName = ""
        this._role = ""
        this._balance = 0
        this._schedule = []
        makeAutoObservable(this)
    }

    setFullName(str) {
        this._fullName = str
    }

    setRole(role) {
        this._role = role
    }

    setBalance(balance) {
        this._balance = balance
    }

    setSchedule(arr) {
        this._schedule = arr
    }

    get role() {
        return this._role
    }

    get fullName() {
        return this._fullName
    }

    get balance() {
        return this._balance
    }

    get schedule() {
        return this._schedule
    }
}
