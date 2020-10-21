import { makeObservable, action, observable } from 'mobx'

class ClientStore {
    numResults = 50
    startResults = 0
    endResults = this.numResults
    active = 1
    showForm = false
    idToUpdate = 0
    key = ''
    value = ''
    constructor() {
        makeObservable(this, {
            numResults: observable,
            startResults: observable,
            endResults: observable,
            active: observable,
            showForm: observable,
            idToUpdate: observable,
            key: observable,
            value: observable,
            changeNumResults: action,
            changeStartResults: action,
            changeEndResults: action,
            changeActive: action,
            changeShowForm: action,
            changeIdToUpdate: action,
            changeValue: action,
            changeKey: action
        })
    }
    changeNumResults = (num) =>{
        this.numResults = num
    }
    changeStartResults = (num) =>{
        this.startResults = num
    }
    changeEndResults = (num) =>{
        this.endResults = num
    }
    changeActive = (num) =>{
        this.active = num
    }
    changeShowForm = () =>{
        this.showForm = !this.showForm
    }
    changeIdToUpdate = (num) =>{
        this.idToUpdate = num
    }
    changeValue = (e) =>{
        e === 0 ?
        this.value = '':
        this.value = e.target.value
    }
    changeKey = (e) =>{
        e === 0 ?
        this.key = '':
        this.key = e.target.value
    }
}
export default ClientStore