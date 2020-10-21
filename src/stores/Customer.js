import { makeObservable, observable, computed, action } from 'mobx'
// import data from '../data.json'
import Axios from 'axios'

class Customer {
    customers = []
    constructor() {
        makeObservable(this, {
            customers: observable,
            numCustomers: computed,
            loadCustomerFromDB: action,
            updateCustomer: action,
            addCustomer: action,
        })
    }
    get numCustomers() {
        return this.customers.length
    }
    loadCustomerFromDB = async () => {
        const response = await Axios.get('http://localhost:4000/customers')
        this.customers = response.data[0]
    }
    updateCustomer = async (id, key, value, name) => {
        if(id === 0 && !this.customers.find(c => c.name === name)){
            return false
        }
        id = id === 0 ? this.customers.find(c => c.name === name)._id : id
        const values = {id, key, value}
        await Axios.put('http://localhost:4000/customer', values)
        this.customers = this.customers.map(c => {
            if (c._id !== id) {
                return c
            }
            c[key] = value
            return c
        })
        return true
    }
    addCustomer = async (firstName, lastName, email, country) => {
        const customer = {firstName, lastName, email, country}
        let response = await Axios.post('http://localhost:4000/customer', customer)
        response = response.data[0]
        customer._id = response
        this.customers.push(customer)
    }
}
export default Customer