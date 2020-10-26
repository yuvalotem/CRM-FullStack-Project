import React from 'react';
import '../styles/FormUpdate.css';
import { inject, observer } from 'mobx-react'
import { Button, Form } from 'react-bootstrap';

const FormUpdate = inject('customerStore', 'clientStore')(observer((props) => {
    const { customerStore, clientStore } = props
    const { key, changeKey, value, changeValue, idToUpdate, changeIdToUpdate, changeShowForm } = clientStore

    const removeForm = () => {
        changeKey(0)
        changeValue(0)
        changeIdToUpdate(0);
        changeShowForm()
    }

    const updateCustomer = () => {
        if (key && value && idToUpdate) {
            customerStore.updateCustomer(idToUpdate, key, value)
            changeKey(0)
            changeValue(0)
            changeIdToUpdate(0);
            changeShowForm()
        } else {
            alert('something is missing')
        }
    }

    return (
        <Form id="updateForm">
            <i className="fas fa-times" id="removeForm" onClick={removeForm}></i>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Select Field</Form.Label>
                <Form.Control as="select" value={key} onChange={changeKey}>
                    <option value='name'>Name</option>
                    <option value='country'>Country</option>
                    <option value='firstContact'>First Contact</option>
                    <option value='sold'>Sold</option>
                    <option value='emailType'>Email Type</option>
                    <option value='owner'>Owner</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Enter new value</Form.Label>
                <Form.Control placeholder="value" value={value} onChange={changeValue} />
            </Form.Group>
            <Button variant="outline-info" onClick={updateCustomer}>
                Update
    </Button>
        </Form>
    );
}))

export default FormUpdate;