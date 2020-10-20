import { observable } from 'mobx'
import data from '../data.json'

class Customer {
    @observable customers = data
}
export default Customer