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
        const response = await Axios.get('https://git.heroku.com/crm-react-yuval.git/analytics')
        this.badgesData = response.data
    }
    getCharts = async (param = 'country') =>{
        const response = await Axios.get('https://git.heroku.com/crm-react-yuval.git/charts/'+ param)
        this.chartsData = response.data
    }
}
export default AnalyticsStore