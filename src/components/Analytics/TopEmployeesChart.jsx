import React from 'react';
// import '../styles/Badges.css';
import { inject, observer } from 'mobx-react'
import {
    ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    Legend,
  } from 'recharts';


const TopEmployeesChart = inject('analyticsStore')(observer((props) => {
    const {analyticsStore} = props

    return (
        <div className='TopEmployeesChart'>
        <h5 className='chartTitle'>Top Employees</h5>
        <ComposedChart
        layout="vertical"
        width={350}
        height={250}
        data={analyticsStore.chartsData.employeesOfTheMonth}
        margin={{
          top: 20, right: 20, bottom: 20, left: 20,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis type="number" />
        <YAxis dataKey="owner" type="category" />
        <Tooltip />
        <Legend />
        <Bar dataKey="Sales" barSize={20} fill="#413ea0" />
      </ComposedChart>
      </div>
    );
}))
export default TopEmployeesChart

