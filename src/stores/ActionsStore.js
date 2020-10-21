import { makeObservable, action, observable } from 'mobx'

class ActionsStore {
    firstName = ''
    lastName = ''
    country = ''
    email = ''
    owner = ''
    emailType = ''
    name = ''
    constructor() {
        makeObservable(this, {
            firstName: observable,
            lastName: observable,
            country: observable,
            email: observable,
            owner: observable,
            emailType: observable,
            name: observable,
            handleChange: action
        })
    }
    handleChange = (name, value) =>{
        this[name] = value
    }
}
export default ActionsStore