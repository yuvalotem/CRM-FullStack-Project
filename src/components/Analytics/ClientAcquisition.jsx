import React, { useEffect, useState } from 'react';
// import '../styles/Badges.css';
import { inject, observer } from 'mobx-react'
import {
    PieChart, Pie, Cell,
  } from 'recharts';


const ClientAcquisition = inject('analyticsStore')(observer((props) => {
    const {analyticsStore} = props
    const [data, setData]= useState([])

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    useEffect(()=>{
        if (analyticsStore.chartsData.clientAcquisition) {
            setData(analyticsStore.chartsData.clientAcquisition)
        }
    }, [analyticsStore.chartsData.clientAcquisition])

      // const RADIAN = Math.PI / 180;
      // const renderCustomizedLabel = ({
      //   cx, cy, midAngle, innerRadius, outerRadius, percent, index, year, count
      // }) => {
      //    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      //   const x = cx + radius * Math.cos(-midAngle * RADIAN);
      //   const y = cy + radius * Math.sin(-midAngle * RADIAN);
      //   return (
      //     <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      //       {`${(percent * 100).toFixed(0)}%`}
      //     </text>
      //   );
      // };

    return (
        <div className='ClientAcquisition'>
            <h5 className='chartTitle'>Client Acquisition</h5>
            <PieChart width={400} height={400}>
            <Pie
            data={data}
            cx={200}
            cy={200}
            labelLine={false}
            label={({count, year}) => count + ' in ' + year}
            outerRadius={80}
            fill="#8884d8"
            dataKey="count"
            >
            {
                data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
            }
            </Pie>
        </PieChart>
      </div>
    );
}))
export default ClientAcquisition
