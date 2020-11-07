import React, { useState } from 'react';
import { inject, observer } from 'mobx-react'
import { Button, Form, Col } from 'react-bootstrap';
import '../../styles/UpdateClientForm.css'


const UpdateClientForm = inject('customerStore', 'actionsStore')(observer((props) => {
    const { customerStore, actionsStore } = props
    const { displayAlert } = actionsStore
    const [name, setName] = useState('')
    const [emailType, setEmailType] = useState('')
    const [owner, setOwner] = useState('')


    const genrateOwners = () => {
        const ownersArray = []
        customerStore.data.forEach(c => {
            if (!ownersArray.some(o => o === c.owner) && c.owner !== null) {
                ownersArray.push(c.owner)
            }
        })
        return ownersArray.map(o => <option key={o} value={o}>{o}</option>)
    }

    const changeField = async (param, value, text) => {
        if (!value || !name) {
            displayAlert('danger', 'No missing fields allowed')
            return
        }
        const found = await customerStore.updateCustomer(0, param, value, name)
        if (!found) {
            displayAlert('danger', 'Name not found')
        } else {
            displayAlert('success', text)
            setName('')
            setOwner('')
            setEmailType('')
        }
    }

    return (
        <Form id='updateClient'>
            <h3>Update Client</h3><br />
            <Form.Group controlId="formGroupName">
                <Form.Control
                    name='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    <Button variant="secondary" onClick={() => changeField('owner', owner, `${name} owner updated to ${owner}`)}>
                        Transfer Ownership
                    </Button>
                </Col>
                <Col>
                    <Form.Control as="select" name='owner' value={owner} onChange={(e) => setOwner(e.target.value)}>
                        <option>Owner</option>
                        {genrateOwners()}
                    </Form.Control>
                </Col>
            </Form.Row><br />
            <Form.Row>
                <Col>
                    <Button variant="secondary" onClick={() => changeField('emailType', emailType, `${name} email type updated to ${emailType}`)}>
                        Update Email Type
                    </Button>
                </Col>
                <Col>
                    <Form.Control as="select" name='emailType' value={emailType} onChange={(e) => setEmailType(e.target.value)}>
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
                    <Button variant="secondary" onClick={() => changeField('sold', '1', `We declare ${name} sale`)}>
                        Sold!
                        </Button>
                </Col>
            </Form.Row>
        </Form>
    );
}))
export default UpdateClientForm