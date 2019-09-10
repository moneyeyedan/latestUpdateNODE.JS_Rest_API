var mysql = require('mysql');

    var connect = mysql.createConnection({
         user:'root',
         password:'Manikandan995@',
         database:'createUser'
     });

module.exports = {
    connect
};