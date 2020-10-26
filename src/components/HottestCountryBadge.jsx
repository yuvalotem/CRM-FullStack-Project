import React from 'react';
// import '../styles/Analytics.css';
import { inject, observer } from 'mobx-react'

const HottestCountryBadge = inject('analyticsStore')(observer((props) => {
    const {analyticsStore} = props

    return (
            <span>
                <h3>{analyticsStore.badgesData.hottestCountry}</h3>
                Hottest Country
            </span>
    );
}))
export default HottestCountryBadge