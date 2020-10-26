import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react'
import { Alert } from 'react-bootstrap';
import '../styles/Action.css'
import UpdateClientForm from './UpdateClientForm'
import NewClientForm from './NewClientForm'


const Actions = inject('customerStore', 'actionsStore')(observer((props) => {
    const { customerStore, actionsStore } = props
    const {showAlert, alertContent, alertType, removeAlert}= actionsStore

    useEffect(() => {
        const fetchCustomersFromDB = async () => {
            await customerStore.loadCustomerFromDB()
        }
        fetchCustomersFromDB()
    }, [])

    useEffect(() => {
        if (showAlert) {
            setTimeout(() => removeAlert(), 3000)
        }
    }, [showAlert])

    return (
        <div className='Actions'>
            <UpdateClientForm />
            <NewClientForm />
            <Alert className='alertMessage' variant={alertType} show={showAlert} onClose={() => removeAlert()} dismissible>
                <Alert.Heading>Attention</Alert.Heading>
                <span>{alertContent}</span>
            </Alert>
        </div>
    );
}))
export default Actions