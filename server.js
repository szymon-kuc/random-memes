const express = require('express')
var path = require('path')
var bot = require('./public/bot')
const app = express()
const port = 5000

app.use(express.static(path.join(__dirname,'public')))


app.post("/call",(req,res,next)=>{
    bot();
    setTimeout(()=>{res.redirect('/')}, 9000)
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))