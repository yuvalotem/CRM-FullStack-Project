const express = require('express')
const Sequelize = require('sequelize')
const moment = require('moment')

const route = express()

const sequelize = new Sequelize('mysql://root:@localhost/sql_crm')
route.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

    next()
})

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    })

route.get('/customers', async function (req, res){
    const customers = await sequelize.query(`SELECT * FROM customer`)
    res.send(customers)
})

route.post("/customer", async (req, res) => {
    const customer = req.body
    const id = await sequelize.query(`INSERT INTO customer VALUES(
        null,
        '${customer.firstName + ' ' + customer.lastName}',
        '${customer.email}',
        '${moment().format('YYYY-MM-DD')}',
        null,
        false,
        null,
        '${customer.country}')`)
    res.send(id)
})
route.put("/customer", async (req, res) => {
    const {key, value, id} = req.body
    const response = await sequelize.query(`UPDATE customer
    SET ${key} = '${value}'
    WHERE _id = ${id}`)
    res.send(response)
})

route.delete('/customer/:id', async function (req, res){
    const {id} = req.params
    const removed = await sequelize.query(`DELETE FROM customer WHERE _id = ${id}`)
    res.send(removed)
})

module.exports = route