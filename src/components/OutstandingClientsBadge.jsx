import React from 'react';
// import '../styles/Analytics.css';
import { inject, observer } from 'mobx-react'

const OutstandingClientsBadge = inject('analyticsStore')(observer((props) => {
    const {analyticsStore} = props

    return (
            <span>
                <h3>{analyticsStore.badgesData.countSold}</h3>
                Outstanding Clients
            </span>
    );
}))
export default OutstandingClientsBadge