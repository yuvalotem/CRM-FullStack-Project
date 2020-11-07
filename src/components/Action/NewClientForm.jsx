import React, { useState } from 'react';
import { inject, observer } from 'mobx-react'
import { Button, Form, Col } from 'react-bootstrap';
import '../../styles/NewClientForm.css'


const NewClientForm = inject('customerStore', 'actionsStore')(observer((props) => {
    const { customerStore, actionsStore } = props
    const { displayAlert } = actionsStore
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [country, setCountry] = useState('')
    const [email, setEmail] = useState('')
    const [owner, setOwner] = useState('')

    const addCustomer = () =>{
        if(!firstName || !lastName || !country || !email || !owner){
            displayAlert('danger', 'No missing fields allowed')
            return
        }
        customerStore.addCustomer(firstName, lastName, email, country, owner)
        displayAlert('success', `${firstName} ${lastName} added succesfuly`)
        setFirstName('')
        setLastName('')
        setCountry('')
        setEmail('')
        setOwner('')
    }

    return (
            <Form id='addClient'>
                <h3>Add New Client</h3><br/>
                <Form.Row>
                    <Col>
                        <Form.Control
                        name='firstName'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First name" />
                    </Col>
                    <Col>
                        <Form.Control
                        name='lastName'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last name" />
                    </Col>
                </Form.Row><br/>
                <Form.Group controlId="formGroupCountry">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                    name='country'
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="Enter Country" />
                </Form.Group>
                <Form.Group controlId="formGroupEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                    name = 'email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email" />
                </Form.Group>
                <Form.Group controlId="formGroupEmail">
                    <Form.Label>Owner</Form.Label>
                    <Form.Control
                    name = 'owner'
                    value={owner}
                    onChange={(e) => setOwner(e.target.value)}
                    placeholder="Enter owner" />
                </Form.Group>
                <Button variant="primary" onClick={addCustomer}>
                    Add New Client
                </Button>
            </Form>
    );
}))
export default NewClientForm