import React, { useEffect } from 'react';
// import '../styles/Analytics.css';
import { inject, observer } from 'mobx-react'
import Badges from './Badges';
import Charts from './Charts';

const Analytics = inject('analyticsStore')(observer((props) => {
    const {analyticsStore} = props
    useEffect(() => {
        const fetchStatsFromDB = async () => {
            await analyticsStore.getStats()
            await analyticsStore.getCharts()
        }
        fetchStatsFromDB()
    }, [])

    return (
        <div className="Analytics">
            <Badges />
            <Charts />
        </div>
    );
}))
export default Analytics