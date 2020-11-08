import Axios from 'axios'
import { makeObservable, action, observable } from 'mobx'

class AnalyticsStore {
    badgesData ={}
    chartsData ={}
    constructor() {
        makeObservable(this, {
            badgesData: observable,
            chartsData: observable,
            getStats: action,
            getCharts: action
        })
    }
    getStats = async () =>{
        const response = await Axios.get('/analytics')
        this.badgesData = response.data
    }
    getCharts = async (param = 'country') =>{
        const response = await Axios.get('/charts/'+ param)
        this.chartsData = response.data
    }
}
export default AnalyticsStore