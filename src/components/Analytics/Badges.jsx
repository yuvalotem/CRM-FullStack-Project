import React from 'react';
import '../../styles/Badges.css';
import { observer } from 'mobx-react'
import NewClientsBadge from './NewClientsBadge';
import EmailsSentBadge from './EmailsSentBadge';
import OutstandingClientsBadge from './OutstandingClientsBadge';
import HottestCountryBadge from './HottestCountryBadge';

const Badges = (observer((props) => {
    return (
        <div className="Badges">
                <i className="fas fa-chart-line"></i>
                <NewClientsBadge />
                <i className="fas fa-envelope"></i>
                <EmailsSentBadge />
                <i className="fas fa-user-circle"></i>
                <OutstandingClientsBadge />
                <i className="fas fa-globe-africa"></i>
                <HottestCountryBadge />
        </div>
    );
}))
export default Badges