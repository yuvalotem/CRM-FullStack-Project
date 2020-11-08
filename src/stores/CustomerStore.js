import { makeObservable, observable, computed, action } from 'mobx'
// import data from '../data.json'
import Axios from 'axios'

class Customer {
    data = []
    constructor() {
        makeObservable(this, {
            data: observable,
            numCustomers: computed,
            loadCustomerFromDB: action,
            updateCustomer: action,
            addCustomer: action,
            properCase: action
        })
    }
    get numCustomers() {
        return this.data.length
    }
    properCase = str => {
        return str[0].toUpperCase() + str.substring(1, str.length).toLowerCase()
    }
    properString = str => {
        let properValue = ''
        for (let i = 0; i < str.split(' ').length; i++) {
            properValue += this.properCase(str.split(' ')[i]) + ' '
        }
        return properValue.slice(0, properValue.length-1)
    }
    loadCustomerFromDB = async () => {
        const response = await Axios.get('https://git.heroku.com/crm-react-yuval.git/customers')
        this.data = response.data[0]
    }
    updateCustomer = async (id, key, value, name) => {
        if (id === 0) {
            name = this.properString(name)
            if (!this.data.find(c => c.name === name)) {
                return false
            }
            id = this.data.find(c => c.name === name)._id
        }
        if(key === 'name'){
            value = this.properString(value)
        }
        const values = {id, key, value}
        await Axios.put('https://git.heroku.com/crm-react-yuval.git/customer', values)
        this.data = this.data.map(c => {
            if (c._id !== id) {
                return c
            }
            c[key] = value
            return c
        })
        return true
    }
    addCustomer = async (firstName, lastName, email, country, owner) => {
        firstName = this.properCase(firstName)
        lastName = this.properCase(lastName)
        const customer = {firstName, lastName, email, country, owner}
        let response = await Axios.post('https://git.heroku.com/crm-react-yuval.git/customer', customer)
        response = response.data[0]
        customer._id = response
        this.data.push(customer)
    }
}
export default Customer