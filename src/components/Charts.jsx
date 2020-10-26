import React from 'react';
import '../styles/Charts.css';
import { observer } from 'mobx-react'
import TopEmployeesChart from './TopEmployeesChart'
import SalesByCountry from './SalesByCountry'
import SalesSinceChart from './SalesSinceChart'
import ClientAcquisition from './ClientAcquisition'

const Charts = (observer((props) => {

    return (
        <div className="Charts">
            <TopEmployeesChart />
            <SalesByCountry />
            <SalesSinceChart />
            <ClientAcquisition />
        </div>
    );
}))
export default Charts