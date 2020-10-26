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
        '${customer.owner}',
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

route.get('/analytics', async function (req, res){

    const [countNewClients] = await sequelize.query(`
    SELECT COUNT(firstContact) AS newClients
    FROM customer
    WHERE firstContact BETWEEN
    '${moment().subtract(1, 'month').format('YYYY-MM-DD')}'
    AND '${moment().format('YYYY-MM-DD')}'`)

    const [countEmail] = await sequelize.query(`
    SELECT COUNT(emailType) AS countMails
    FROM customer
    WHERE emailType IS NOT NULL`)

    const [countSold] = await sequelize.query(`
    SELECT COUNT(sold) AS countSold
    FROM customer
    WHERE sold = 0`)

    const [hottestCountry] = await sequelize.query(`
    SELECT       country as hottestCountry,
             COUNT(country) AS countHottestCountry
    FROM     customer
    GROUP BY country
    ORDER BY countHottestCountry DESC
    LIMIT    1;`)
    res.send({ ...countNewClients[0], ...countEmail[0], ...countSold[0], ...hottestCountry[0] })
})

route.put('/charts', async function (req, res){
    let param = req.body.param
    param = param ? param : 'country'
    const [employeesOfTheMonth] = await sequelize.query(`
    SELECT       owner,
             COUNT(sold) AS Sales
    FROM     customer
    WHERE sold = 1
    GROUP BY owner
    ORDER BY Sales DESC
    LIMIT    3;`)

    const [salesByCountry] = await sequelize.query(`
    SELECT       ${param},
             COUNT(${param}) AS Sales
    FROM     customer
    WHERE sold = 1
    GROUP BY ${param};`)

    const [salesSince] = await sequelize.query(`
    SELECT       firstContact,
             COUNT(firstContact) AS count
    FROM     customer
    WHERE firstContact BETWEEN
    '${moment().subtract(1, 'month').format('YYYY-MM-DD')}'
    AND '${moment().format('YYYY-MM-DD')}'
    GROUP BY firstContact;`)

    const [clientAcquisition] = await sequelize.query(`
    SELECT      YEAR(firstContact) AS year,
             COUNT(firstContact) AS count
    FROM     customer
    GROUP BY year > '${moment().subtract(1, 'year').format('YYYY')}',
    year > '${moment().subtract(3, 'YEAR').format('YYYY')}'`)

    res.send({ employeesOfTheMonth, salesByCountry, salesSince, clientAcquisition })
})

module.exports = route