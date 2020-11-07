import React from 'react';
// import '../styles/Analytics.css';
import { inject, observer } from 'mobx-react'
import moment from 'moment'

const NewClientsBadge = inject('analyticsStore')(observer((props) => {
    const {analyticsStore} = props

    return (
            <span>
                <h3>{analyticsStore.badgesData.newClients}</h3>
                New {moment().format("MMMM")} Clients
            </span>
    );
}))
export default NewClientsBadge