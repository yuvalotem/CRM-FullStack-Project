import React, { useEffect, useState } from 'react';
// import '../styles/Badges.css';
import { inject, observer } from 'mobx-react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import moment from 'moment'

const SalesSinceChart = inject('analyticsStore')(observer((props) => {
    const {analyticsStore} = props
    const {chartsData} = analyticsStore
    const {salesSince} = chartsData
    const [data, setData] = useState([])

    useEffect(() => {
        if(analyticsStore.chartsData.salesSince){
            const newData = []
            for(let i = 30; i >= 0; i--){
                const date = moment().subtract(i, 'days').format('YYYY-MM-DD')
                const found = salesSince.find(j => j.firstContact === date)
                if (found) {
                    const newItem = { date: moment().subtract(i, 'days').format('YYYY-MM-DD'), sales: found.count }
                    newData.push(newItem)
                } else {
                    const newItem = { date: moment().subtract(i, 'days').format('YYYY-MM-DD'), sales: 0 }
                    newData.push(newItem)
                }
            }
            setData(newData)
        }
    }, [salesSince])

    return (
        <div className="SalesSinceChart">
            <h5 className='chartTitle'>Sales Since {moment().subtract(30, 'days').format('MMM-DD')}</h5>
            <LineChart width={1000} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="sales" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
            </LineChart>
        </div>
    );
}))
export default SalesSinceChart