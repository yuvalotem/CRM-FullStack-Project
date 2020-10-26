import React from 'react';
// import '../styles/Analytics.css';
import { inject, observer } from 'mobx-react'

const EmailsSentBadge = inject('analyticsStore')(observer((props) => {
    const {analyticsStore} = props

    return (
            <span>
                <h3>{analyticsStore.badgesData.countMails}</h3>
                Emails Sent
            </span>
    );
}))
export default EmailsSentBadge