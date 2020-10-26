import { makeObservable, action, observable } from 'mobx'

class ActionsStore {
    showAlert = false
    alertContent = ''
    alertType = ''
    constructor() {
        makeObservable(this, {
            showAlert: observable,
            alertContent: observable,
            alertType: observable,
            displayAlert: action,
            removeAlert: action
        })
    }
    displayAlert = (type, text) =>{
        this.alertType = type
        this.alertContent = text
        this.showAlert = true
    }
    removeAlert = () =>{
        this.showAlert = false
    }
}
export default ActionsStore