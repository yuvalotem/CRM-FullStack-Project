import React, { useState } from 'react';
import { inject, observer } from 'mobx-react'
import { Button, Form, Col } from 'react-bootstrap';
import '../styles/UpdateClientForm.css'


const UpdateClientForm = inject('customerStore', 'actionsStore')(observer((props) => {
    const { customerStore, actionsStore } = props
    const { displayAlert } = actionsStore
    const [name, setName] = useState('')
    const [emailType, setEmailType] = useState('')
    const [owner, setOwner] = useState('')

    const declareSale = async () =>{
        if (!name) {
            displayAlert('danger', 'No missing fields allowed')
            return
        }
        const found = await customerStore.updateCustomer(0, 'sold', '1', name)
        if (!found) {
            displayAlert('danger', 'Name not found')
        } else {
            displayAlert('success', `We declare ${name} sale`)
            setName('')
        }
    }

    const genrateOwners = () => {
        const ownersArray = []
        customerStore.data.forEach(c =>{
            if(!ownersArray.some(o=> o === c.owner) && c.owner !== null){
                ownersArray.push(c.owner)
            }
        })
        return ownersArray.map(o => <option key={o} value={o}>{o}</option>)
    }

    const changeOwner = async () => {
        if (!owner || !name) {
            displayAlert('danger', 'No missing fields allowed')
            return
        }
        const found = await customerStore.updateCustomer(0, 'owner', owner, name)
        if (!found) {
            displayAlert('danger', 'Name not found')
        } else {
            displayAlert('success', `${name} owner updated to ${owner}`)
            setName('')
            setOwner('')
        }
    }

    const changeMail = async () => {
        if (!emailType || !name) {
            displayAlert('danger', 'No missing fields allowed')
            return
        }
        const found = await customerStore.updateCustomer(0, 'emailType', emailType, name)
        if (!found) {
            displayAlert('danger', 'Name not found')
        } else {
            displayAlert('success', `${name} email type updated to ${emailType}`)
            setName('')
            setEmailType('')
        }
    }
    return (
        <Form id='updateClient'>
            <h3>Update Client</h3><br/>
            <Form.Group controlId="formGroupName">
                <Form.Control
                    name='name'
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                    placeholder="Client Name"
                    list="data" />
            </Form.Group>
            <datalist id="data">
                {customerStore.data.map((item, key) =>
                    <option key={key} value={item.name} />
                )}
            </datalist>
            <Form.Row>
                <Col>
                    <Button variant="secondary" onClick={changeOwner}>
                        Transfer Ownership
                    </Button>
                </Col>
                <Col>
                    <Form.Control as="select" name='owner' value={owner} onChange={(e)=> setOwner(e.target.value)}>
                        <option>Owner</option>
                        {genrateOwners()}
                    </Form.Control>
                </Col>
            </Form.Row><br />
            <Form.Row>
                <Col>
                    <Button variant="secondary" onClick={changeMail}>
                        Update Email Type
                    </Button>
                </Col>
                <Col>
                    <Form.Control as="select" name='emailType' value={emailType} onChange={(e)=> setEmailType(e.target.value)}>
                        <option>Email Type</option>
                        <option value='A'>A</option>
                        <option value='B'>B</option>
                        <option value='C'>C</option>
                        <option value='D'>D</option>
                    </Form.Control>
                </Col>
            </Form.Row><br />
            <Form.Row>
            <Col>
                Declare Sale
                </Col>
                <Col>
                    <Button variant="secondary" onClick={declareSale}>
                        Sold!
                        </Button>
                </Col>
            </Form.Row>
        </Form>
    );
}))
export default UpdateClientForm