const express = require('express')
const bodyParser = require('body-parser')
const api = require('./server/routes/api')
const path = require('path')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'build')));


// app.use('/', api)

// app.get('*', function (req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

const port = 4000
app.listen(process.env.PORT || port, function(req, res){
    console.log('running on ' + port);
})