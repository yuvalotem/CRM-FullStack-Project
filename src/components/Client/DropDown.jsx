import React from 'react';
import '../../styles/DropDown.css';
import { Dropdown, DropdownButton} from 'react-bootstrap';
import { inject, observer } from 'mobx-react'

const DropDown = inject('clientStore')(observer((props) => {
    const { clientStore } = props
    const { numResults,
        changeNumResults,
        changeStartResults,
        changeEndResults,
        changeActive } = clientStore

    const handleClick = (e) => {
        changeNumResults(parseInt(e.target.textContent))
        changeStartResults(0)
        changeEndResults(parseInt(e.target.textContent))
        changeActive(1)
    }

    return (
        <DropdownButton variant="info" id="dropdown-basic-button" title={`${numResults} Results`}>
            <Dropdown.Item onClick={handleClick}>50 Results</Dropdown.Item>
            <Dropdown.Item onClick={handleClick}>100 Results</Dropdown.Item>
            <Dropdown.Item onClick={handleClick}>200 Results</Dropdown.Item>
        </DropdownButton>
    );
}))

export default DropDown;