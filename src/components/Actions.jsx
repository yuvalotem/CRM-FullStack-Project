import React from 'react';
import { inject, observer } from 'mobx-react'
import { Button, Form, Col } from 'react-bootstrap';
import '../styles/Action.css'


const Actions = inject('cutomers', 'actionsStore')(observer((props) => {
    const { cutomers, actionsStore } = props
    const {firstName, lastName, country, email, owner, emailType, name } = actionsStore

    const handleChange = e =>{
        actionsStore.handleChange(e.target.name, e.target.value)
    }

    const addCustomer = () =>{
        if(!firstName || !lastName || !country || !email){
            alert('something is missing')
            return
        }
        cutomers.addCustomer(firstName, lastName, email, country)
        actionsStore.handleChange('firstName', '')
        actionsStore.handleChange('lastName', '')
        actionsStore.handleChange('country', '')
        actionsStore.handleChange('email', '')
    }

    const changeOwner = async () =>{
        if(!emailType || !name){
            alert('something is missing')
            return
        }
        const found = await cutomers.updateCustomer(0, 'owner', owner, name)
        if(!found){
            alert('name not found')
        }else{
            actionsStore.handleChange('owner', '')
            actionsStore.handleChange('name', '')
        }
    }

    const changeMail = () =>{
        if(!emailType || !name){
            alert('something is missing')
            return
        }
        const found = cutomers.updateCustomer(0, 'emailType', emailType, name)
        if(!found){
            alert('name not found')
        }else{
            actionsStore.handleChange('emailType', '')
            actionsStore.handleChange('name', '')
        }
    }
    return (
        <div className='Actions'>
            <Form id='updateClient'>
                <h3>Update Client</h3>
                <Form.Group controlId="formGroupName">
                    <Form.Control
                    name='name'
                    value={name}
                    onChange={handleChange}placeholder="Client Name" />
                </Form.Group>
                <Form.Row>
                    <Col>
                        <Form.Control
                        name='owner'
                        value={owner}
                        onChange={handleChange}
                        placeholder="New Ownership" />
                    </Col>
                    <Col>
                        <Button variant="secondary" onClick={changeOwner}>
                         Update Ownership
                        </Button>
                    </Col>
                </Form.Row><br/>
                <Form.Row>
                    <Col>
                        <Form.Control
                        name='emailType'
                        value={emailType}
                        onChange={handleChange}
                        placeholder="New Mail Type" />
                    </Col>
                    <Col>
                        <Button variant="secondary" onClick={changeMail}>
                         Update Mail Type
                        </Button>
                    </Col>
                </Form.Row><br/>
                <Form.Row>
                </Form.Row><br/>
            </Form><br/>

            <Form id='addClient'>
                <h3>Add New Client</h3>
                <Form.Row>
                    <Col>
                        <Form.Control
                        name='firstName'
                        value={firstName}
                        onChange={handleChange}
                        placeholder="First name" />
                    </Col>
                    <Col>
                        <Form.Control
                        name='lastName'
                        value={lastName}
                        onChange={handleChange}
                        placeholder="Last name" />
                    </Col>
                </Form.Row><br/>
                <Form.Group controlId="formGroupCountry">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                    name='country'
                    value={country}
                    onChange={handleChange}
                    placeholder="Enter Country" />
                </Form.Group>
                <Form.Group controlId="formGroupEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                    name = 'email'
                    value={email}
                    onChange={handleChange}
                    placeholder="Enter email" />
                </Form.Group>
                <Button variant="primary" onClick={addCustomer}>
                    Add New Client
                </Button>
            </Form>
        </div>
    );
}))
export default Actions