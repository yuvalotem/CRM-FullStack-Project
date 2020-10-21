import React from 'react';
import { Pagination } from 'react-bootstrap';
import { inject, observer } from 'mobx-react'

const Clients = inject('cutomers', 'clientStore')(observer((props) => {
    const { cutomers, clientStore } = props
    const { numResults,
        active,
        changeStartResults,
        changeEndResults,
        changeActive } = clientStore
    const items = []

    for (let number = 1; number <= Math.ceil(cutomers.numCustomers / numResults); number++) {
        items.push(
            <Pagination.Item onClick={() => {
                changeStartResults(number * numResults - numResults)
                changeEndResults(number * numResults)
                changeActive(number)
            }} key={number} active={number === active}>
                {number}
            </Pagination.Item>,
        );
    }


    return (
            <Pagination size="sm">{items}</Pagination>
    );
}))
export default Clients