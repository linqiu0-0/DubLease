var mysql = require('mysql');
var connection = mysql.createConnection({
   host     : 'database-dublease.cgiuptojslql.us-west-2.rds.amazonaws.com',
   port     : '3306',
   user     : 'admin',
   password : 'Ryan6666!!',
   database : 'dublease'
});

// connects to the database when app starts
exports.database_init = function() {
    connection.connect(function(err){
        if(!err) {
            console.log("Database is connected ... ");    
        } else {
            console.log("Error connecting database ... ");   
            console.log(err);
        }
    });
};
