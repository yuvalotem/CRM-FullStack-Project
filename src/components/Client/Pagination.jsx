import React from 'react';
import { Pagination } from 'react-bootstrap';
import { inject, observer } from 'mobx-react'

const Clients = inject('clientStore')(observer((props) => {
    const { clientStore } = props
    const { numResults,
        active,
        changeStartResults,
        changeEndResults,
        changeActive,
        filterData,
        showForm,
        changeShowForm } = clientStore
    const items = []

    const openForm = (number) => {
        changeStartResults(number * numResults - numResults)
        changeEndResults(number * numResults)
        changeActive(number)
        if (showForm) {
            changeShowForm()
        }
    }

    for (let number = 1; number <= Math.ceil(filterData.length / numResults); number++) {
        items.push(
            <Pagination.Item
                onClick={() => openForm(number)}
                key={number}
                active={number === active}>
                {number}
            </Pagination.Item>,
        );
    }


    return (
        <Pagination size="sm">{items}</Pagination>
    );
}))
export default Clients