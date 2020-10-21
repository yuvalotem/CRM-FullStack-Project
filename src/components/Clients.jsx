import React, { Fragment, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import '../styles/Clients.css';
import { inject, observer } from 'mobx-react'
import FormUpdate from './FormUpdate';
import DropDown from './DropDown';
import Pagination from './Pagination';

const Clients = inject('cutomers', 'clientStore')(observer((props) => {
    const { cutomers, clientStore } = props
    const {
        startResults,
        endResults,
        showForm,
        changeShowForm,
        changeIdToUpdate,
        changeKey,
        changeValue } = clientStore

    useEffect(() => {
        const fetchCustomersFromDB = async () => {
            await cutomers.loadCustomerFromDB()
        }
        fetchCustomersFromDB()
    }, [])


    const addUpdateForm = (id) => {
        changeKey(0)
        changeValue(0)
        changeIdToUpdate(id);
        changeShowForm()
    }

    return (
        <div className="Clients">
            <DropDown />

            <ListGroup>
                <ListGroup.Item className='costumer' variant="dark">
                    <span>Name</span>
                    <span>Surname</span>
                    <span>Country</span>
                    <span>First Contact</span>
                    <span>Sold</span>
                    <span>Email Type</span>
                    <span>Owner</span>
                </ListGroup.Item>
                {cutomers.customers.map((c, i) => startResults <= i && i <= endResults ?
                    <Fragment key={c._id}>
                        <ListGroup.Item className='costumer' onClick={() => addUpdateForm(c._id)}>
                            <span>{c.name.split(' ')[0]} </span>
                            <span>{c.name.split(' ')[1]}</span>
                            <span>{c.country}</span>
                            <span>{c.firstContact}</span>
                            <span>{c.sold ? <i className="fas fa-check"></i> : <i className="fas fa-times"></i>}</span>
                            <span>{c.emailType === 'null' ? '' : c.emailType}</span>
                            <span>{c.owner}</span>
                        </ListGroup.Item>
                    </Fragment> :
                    null)}
            </ListGroup>
                    {showForm ? <FormUpdate /> : null}

            <Pagination />
        </div>
    );
}))
export default Clients