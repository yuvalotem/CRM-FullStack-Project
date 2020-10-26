import React, { useState } from 'react';
import { Dropdown, FormControl, InputGroup, DropdownButton } from 'react-bootstrap';
import '../styles/searchBar.css';
import { inject, observer } from 'mobx-react'

const SearchBar = inject('clientStore')(observer((props) => {
    const { clientStore} = props
    const {searchKey, searchValue , changeSearchValue , changeSearchKey} = clientStore
    const [titleValue, setTitleValue] = useState('Name')


    const handleClick = e =>{
        changeSearchKey(e.target.getAttribute('value'));
        console.log(e.target.getAttribute('value'));
        setTitleValue(e.target.text)
    }

    const handleType = e =>{
        changeSearchValue(e.target.value)
    }

    const checkObj = {}
    const addDataList = (item, key) => {
        if (!checkObj[item[searchKey]]) {
            checkObj[item[searchKey]] = 1
            return <option key={key} value={item[searchKey]} />
        }
    }

    return (
        <InputGroup id='searchBar'>
            <FormControl
                placeholder={`Search by ${titleValue}`}
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                onChange={handleType}
                value={searchValue}
                list='data'
            />
            <datalist id="data">
                {clientStore.filterData.map((item, key) =>addDataList(item, key))}
            </datalist>

            <DropdownButton
                as={InputGroup.Append}
                variant="info"
                title={titleValue}
                id="input-group-dropdown-2"
            >
                <Dropdown.Item value='name' onClick={handleClick}>Name</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item value='country' onClick={handleClick}>Country</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item value='firstContact' onClick={handleClick}>First Contact</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item value='sold' onClick={handleClick}>Sold</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item value='emailType' onClick={handleClick}>Email Type</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item value='owner' onClick={handleClick}>Owner</Dropdown.Item>
            </DropdownButton>
        </InputGroup>
    );
}))
export default SearchBar