import React, { useState } from 'react';
import { Dropdown, DropdownButton, ListGroup, Pagination } from 'react-bootstrap';
import '../styles/Clients.css';
import data from '../data.json'

export default function Clients() {
    const [numResults, setNumResults] = useState(50)
    const [startResults, setStartResults] = useState(0)
    const [endResults, setEndResults] = useState(numResults)
    const [active, setActive] = useState(1)
    const items = []

    for (let number = 1; number <= data.length / numResults; number++) {
        items.push(
            <Pagination.Item onClick={() => {
                setStartResults(number * numResults - numResults)
                setEndResults(number * numResults)
                setActive(number)
            }} key={number} active={number === active}>
                {number}
            </Pagination.Item>,
        );
    }

    const handleClick = (e) => {
        setNumResults(parseInt(e.target.textContent))
        setStartResults(0)
        setEndResults(parseInt(e.target.textContent))
    }

    return (
        <div className="Clients">
            <DropdownButton id="dropdown-basic-button" title={`${numResults} Results`}>
                <Dropdown.Item onClick={handleClick}>50 Results</Dropdown.Item>
                <Dropdown.Item onClick={handleClick}>100 Results</Dropdown.Item>
                <Dropdown.Item onClick={handleClick}>200 Results</Dropdown.Item>
            </DropdownButton>

            <ListGroup>
                <ListGroup.Item className='costumer' variant="dark">
                    <span>Name</span>
                    <span>Email</span>
                    <span>Country</span>
                    <span>First Contact</span>
                    <span>Sold</span>
                    <span>Email Type</span>
                    <span>Owner</span>
                </ListGroup.Item>
                {data.map((c, i) => startResults <= i && i <= endResults ?
                    <ListGroup.Item key={i} className='costumer'>
                        <span>{c.name} </span>
                        <span>{c.email}</span>
                        <span>{c.country}</span>
                        <span>{c.firstContact}</span>
                        <span>{c.sold? 'v': '-'}</span>
                        <span>{c.emailType}</span>
                        <span>{c.owner}</span>
                    </ListGroup.Item> :
                    null)}
            </ListGroup>

            <Pagination size="sm">{items}</Pagination>
        </div>
    );
}