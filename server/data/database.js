var mysql = require('mysql');
var connection = mysql.createConnection({
   host     : 'database-dublease.cgiuptojslql.us-west-2.rds.amazonaws.com',
   port     : '3306',
   user     : 'admin',
   password : 'Ryan6666!!',
   database : 'dublease'
});

// connects to the database on start
connection.connect(function(err){
    if(!err) {
        console.log("Database is connected ... ");    
    } else {
        console.log("Error connecting database ... ");   
        console.log(err);
    }
});

// returns true if the email exists
exports.check_email = async function(email) {
    const sql = 'SELECT COUNT(*) AS count FROM User WHERE UserEmail = ?';
    return new Promise((resolve, reject) => {
        connection.query(sql, email, function(error, results, fields) {
            if (error) {
                return reject(error);
            }
            var count = results[0].count;
            return resolve(count > 0);
        });
    });
}

exports.add_user = async function(username, email, password_hash) {
    const sql = 'INSERT INTO User (UserName, UserEmail, PasswordHash) VALUES (?)';
    const values = [username, email, password_hash];
    return new Promise((resolve, reject) => {
        connection.query(sql, [values], function(error, results, fields) {
            return error ? reject(error) : resolve(results.insertId);
        });
    });
}

exports.get_user = async function(email) {
    const sql = 'SELECT UserID as userid, UserName as username, PasswordHash as password_hash FROM User WHERE UserEmail = ?';
    return new Promise((resolve, reject) => {
        connection.query(sql, email, function(error, results, fields) {
            return error ? reject(error) : resolve(results[0]);
        });
    });
}