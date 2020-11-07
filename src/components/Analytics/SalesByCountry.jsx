import React, { useEffect, useState } from 'react';
import '../../styles/Badges.css';
import { inject, observer } from 'mobx-react'
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import moment from 'moment'

const SalesByCountry = inject('analyticsStore')(observer((props) => {
    const {analyticsStore} = props
    const [param , setParam] = useState('country')
    const [data , setData] = useState(analyticsStore.chartsData.salesByCountry)

    useEffect(()=>{
        setData(analyticsStore.chartsData.salesByCountry)
    }, [analyticsStore.chartsData.salesByCountry])

    const handleChange = async (e) => {
        setParam(e.target.value)
        await analyticsStore.getCharts(e.target.value)
        if (analyticsStore.chartsData.salesByCountry[0]['MONTH(firstContact)']) {
            const newData = analyticsStore.chartsData.salesByCountry.map(c => {
                c['MONTH(firstContact)'] = moment().month(c['MONTH(firstContact)']-1).format("MMM")
                return c
            })
            setData(newData)
        }else{
            setData(analyticsStore.chartsData.salesByCountry)
        }
    }

    return (
        <div className="SalesByCountry">
            <h5 className='chartTitle'>Sales By
            <select value={param} onChange={handleChange}>
                    <option value='country'>Country</option>
                    <option value='emailType'>Email</option>
                    <option value='MONTH(firstContact)'>Month</option>
                    <option value='owner'>Owner</option>
            </select>
            </h5>
            <BarChart
                width={900}
                height={300}
                data={data}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={param} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Sales" fill="#8884d8" />
            </BarChart>
        </div>
    );
}))
export default SalesByCountry
