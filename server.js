const express = require('express')
var path = require('path')
const bot = require('./public/bot')
const app = express()
const port = 3000

app.use(express.static(path.join(__dirname,'public')))

bot;

app.listen(port, () => console.log(`Example app listening on port ${port}!`))