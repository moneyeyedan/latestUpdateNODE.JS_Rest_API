const express = require('express');
const app = express();
let ip = process.env.ip;
let port = process.env.PORT || 4000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
var connect = require('./databaseConnection');
app.post('/createUser', (req, res) => {
    var user = {
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        degree:req.body.degree,
        course:req.body.course,
        age:req.body.age
    }
    connect.connect.query('insert into user set ?',user,(err,result)=>{
        if(err){
            res.send(err);
            return;
        }
        res.send(result);
    })
});
app.get('/User',(req,res)=>{
    connect.connect.query('select * from user',(err,result)=>{
        if(err){
            res.send(err);
            return;
        }
        res.send(result);
    })
})
var httpServer = require('http').createServer(app);
httpServer.listen(port,ip, () => console.log(`listening on http://${ip}:${port}`));
