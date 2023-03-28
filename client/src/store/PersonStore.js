import {makeAutoObservable} from "mobx";
import {getPersonForUser} from "../http/userAPI";

export default class PersonStore {
    constructor() {
        this._id = 0
        this._fullName = ""
        this._role = ""
        this._balance = 0
        this._schedule = []
        makeAutoObservable(this)
    }

    setId(id) {
        this._id = id
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

    get id() {
        return this._id
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

    updatePerson(login) {
        getPersonForUser(login)
            .then(data => {
                this.setId(data.id)
                this.setFullName(data.fullName)
                this.setBalance(data.balance)
                this.setRole(data.role)
                this.setSchedule(data.schedules.map(x => x.id))
            })
    }
}
