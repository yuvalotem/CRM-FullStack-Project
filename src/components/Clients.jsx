import React, { Fragment, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import '../styles/Clients.css';
import { inject, observer } from 'mobx-react'
import FormUpdate from './FormUpdate';
import DropDown from './DropDown';
import Pagination from './Pagination';
import SearchBar from './SearchBar';

const Clients = inject('customerStore', 'clientStore')(observer((props) => {
    const { customerStore, clientStore } = props
    const {
        startResults,
        endResults,
        showForm,
        changeShowForm,
        changeIdToUpdate,
        changeKey,
        changeValue,
        searchKey,
        searchValue,
        filterData,
        enterData} = clientStore

    useEffect(() => {
        const fetchCustomersFromDB = async () => {
            await customerStore.loadCustomerFromDB()
            enterData(customerStore.data)
        }
        fetchCustomersFromDB()
    }, [])

    useEffect(() => {
        if (searchValue) {
            enterData(customerStore.data.filter(c => typeof c[searchKey] === 'string' ?
                c[searchKey].includes(searchValue) :
                c[searchKey] === (searchValue)))
        } else {
            enterData(customerStore.data)
        }
    }, [searchKey, searchValue])


    const addUpdateForm = (id) => {
        changeKey(0)
        changeValue(0)
        changeIdToUpdate(id);
        changeShowForm()
    }

    return (
        <div className="Clients">
            <div id='topBar'>
                <DropDown />
                <SearchBar />
            </div>
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
                {filterData.map((c, i) => startResults <= i && i <= endResults ?
                    <Fragment key={c._id}>
                        <ListGroup.Item className='costumer' onClick={() => addUpdateForm(c._id)}>
                            <span>{c.name.split(' ')[0]} </span>
                            <span>{c.name.split(' ')[1]} {c.name.split(' ')[2]}</span>
                            <span>{c.country}</span>
                            <span>{c.firstContact}</span>
                            <span>{c.sold ? <i className="fas fa-check"></i> : <i className="fas fa-times"></i>}</span>
                            <span>{c.emailType}</span>
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