const express = require('express');
const promise = require('promise');
const app = express();
let ip = process.env.ip;
let port = process.env.PORT || 4000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
var connect = require('./databaseConnection');
app.post('/createUser', (req, res) => {
    var check = false;
    var user = {
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        degree:req.body.degree,
        course:req.body.course,
        age:req.body.age
    }

    new promise((resolve,rejected)=>{
        for(let prop in user){
            if(user[prop] == '' || user[prop] == null){
                check = true;
            }
        }       
        resolve("check");
    }).then(data=>{
        if(!check){
            connect.connect.query('insert into user set ?',user,(err,result)=>{
                if(err){
                    res.send(err);
                    return;
                }
                res.send(result);
            })
        }
        else{
            res.send('send null property value is send');
        }
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
//if you want to local ip address is set to the project cmd:node project_filename.js --ip=address || export ip=ip_address
//if you want to dynamic port:process.env.PORT=>here assign PORT name is given cmd:PORT=number node projectname.js