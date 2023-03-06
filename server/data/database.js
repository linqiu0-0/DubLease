var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'database-dublease.cgiuptojslql.us-west-2.rds.amazonaws.com',
    port     : '3306',
    user     : 'admin',
    password : 'Ryan6666!!',
    database : 'dublease'
});

// connects to the database (should be called on start of app)
exports.connect_to_db = function() {
    connection.connect(function(err){
        if(!err) {
            console.log("Database is connected ... ");
        } else {
            console.log("Error connecting database ... ");
            console.log(err);
            throw err;
        }
    });
};

exports.disconnect_db = function() {
    connection.end(function(err){
        if(!err) {
            console.log("Database is disconnected");
        } else {
            console.log("Error disconnecting database:");
            console.log(err);
            throw err;
        }
    });
};

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
};

exports.add_user = async function(username, email, password_hash) {
    const sql = 'INSERT INTO User (UserName, UserEmail, PasswordHash) VALUES (?)';
    const values = [username, email, password_hash];
    return new Promise((resolve, reject) => {
        connection.query(sql, [values], function(error, results, fields) {
            return error ? reject(error) : resolve(results.insertId);
        });
    });
};

// private
exports._delete_test_user = async function() {
    const sql = 'DELETE FROM User WHERE UserName like ?';
    return new Promise((resolve, reject) => {
        connection.query(sql, "test_%", function(error, results, fields) {
            return error ? reject(error) : resolve(results.affectedRows);
        });
    });
};

// private 
exports._delete_test_user = async function() {
    const sql = 'DELETE FROM User WHERE UserName like ?';
    return new Promise((resolve, reject) => {
        connection.query(sql, "test_%", function(error, results, fields) {
            return error ? reject(error) : resolve(results.affectedRows);
        });
    });
};

exports.get_user = async function(email) {
    const sql = 'SELECT UserID as userid, UserName as username, PasswordHash as password_hash FROM User WHERE UserEmail = ?';
    return new Promise((resolve, reject) => {
        connection.query(sql, email, function(error, results, fields) {
            return error ? reject(error) : resolve(results[0]);
        });
    });
};

exports.check_user_id = async function(userid) {
    const sql = 'SELECT COUNT(*) as count FROM User WHERE UserID = ?';
    return new Promise((resolve, reject) => {
        connection.query(sql, userid, function(error, results, fields) {
            if (error) {
                return reject(error);
            }
            var count = results[0].count;
            return resolve(count > 0);
        });
    });
};

exports.get_user_by_id = async function(userid) {
    const sql = 'SELECT UserName as username, UserEmail as email, Phone as phone FROM User WHERE UserID = ?';
    return new Promise((resolve, reject) => {
        connection.query(sql, userid, function(error, results, fields) {
            return error ? reject(error) : resolve(results[0]);
        });
    });
};

exports.update_user = async function(update_statements, values) {
    const sql = "UPDATE User " + update_statements + " WHERE UserID = ?";
    console.log(sql);
    return new Promise((resolve, reject) => {
        connection.query(sql, values, function(error, results, fields) {
            console.log(results);
            // console.log("subleases: \n", subleases);
            return error ? reject(error) : resolve(results);
        });
    });
};


// Params:
//  sql_conditions: basically what's after the WHERE clause (e.g. "name = ? AND MIN_PRICE < ? AND ...")
//  condition_values: values corresponding to the specified conditions. Orders must match exactly
// Return:
//  list of filtered subleases (could be empty)
exports.filter_sublease = async function(sql_conditions, condition_values) {
    const sql = 'SELECT * FROM Sublease' + sql_conditions;
    // console.log(sql);
    // console.log(condition_values);
    return new Promise((resolve, reject) => {
        connection.query(sql, condition_values, function(error, results, fields) {
            if (error) {
                return reject(error);
            }
            subleases = [];
            for (let row in results) {
                subleases.push(JSON.parse(JSON.stringify(results[row])));
            }
            // console.log("subleases: \n", subleases);
            return resolve(subleases);
        });
    });
};


exports.get_sublease_images = async function(lease_id) {
    const sql = 'SELECT ImageKey FROM Sublease_Images WHERE LeaseID = ?';
    return new Promise((resolve, reject) => {
        connection.query(sql, lease_id, function(error, results, fields) {
            if (error) {
                return reject(error);
            }
            var image_keys = [];
            // console.log(results);
            for (let row in results) {
                image_keys.push(results[row].ImageKey);
            }
            return resolve(image_keys);
        });
    });
};

exports.get_lease_by_id = async function(id) {
    const sql = 'SELECT * FROM Sublease WHERE PostID = ?';
    return new Promise((resolve, reject) => {
        connection.query(sql, id, function(error, results, fields) {
            return error ? reject(error) : resolve(results[0]);
        });
    });
};

exports.check_lease_exists = async function(id) {
    const sql = 'SELECT COUNT(*) FROM Sublease WHERE PostID = ?';
    return new Promise((resolve, reject) => {
        connection.query(sql, id, function(error, results, fields) {
            if (error) {
                return reject(error);
            }
            var count = results[0].count;
            return resolve(count > 0);
        });
    });
};

exports.list_sublease_by_user_id = async function(userid) {
    const sql = 'SELECT * FROM Sublease WHERE UserID = ?';
    return new Promise((resolve, reject) => {
        connection.query(sql, userid, function(error, results, fields) {
            if (error) {
                return reject(error);
            }
            subleases = [];
            for (let row in results) {
                subleases.push(JSON.parse(JSON.stringify(results[row])));
            }
            return resolve(subleases);
        });
    });
};

exports.lease_insert = async function(value_map) {
    const sql = "INSERT INTO Sublease SET ?";
    return new Promise((resolve, reject) => {
        connection.query(sql, value_map, function(error, results, fields) {
            return error ? reject(error) : resolve(results.insertId);
        });
    });
};

exports.lease_update = async function(value_map, lease_id) {
    const sql = "Update Sublease SET ? WHERE PostID = ?";
    return new Promise((resolve, reject) => {
        connection.query(sql, [value_map, lease_id], function(error, results, fields) {
            return error ? reject(error) : resolve(results.affectedRows);
        });
    });
};

exports.check_lease_id_and_image_key_exists = async function(lease_id, image_key) {
    const sql = 'SELECT COUNT(*) AS count FROM Sublease_Images WHERE LeaseID = ? AND ImageKey = ?';
    return new Promise((resolve, reject) => {
        connection.query(sql, [lease_id, image_key], function(error, results, fields) {
            if (error) {
                return reject(error);
            }
            var count = results[0].count;
            return resolve(count > 0);
        });
    });
};

exports.add_lease_id_and_image_key = async function(lease_id, image_key) {
    const sql = "INSERT INTO Sublease_Images SET ?";
    return new Promise((resolve, reject) => {
        connection.query(sql, {LeaseID: lease_id, ImageKey: image_key}, function(error, results, fields) {
            return error ? reject(error) : resolve(results.affectedRows);
        });
    });
};

exports.change_lease_status = async function(lease_id, status) {
    const sql = "UPDATE Sublease SET status = ? WHERE PostID = ?";
    return new Promise((resolve, reject) => {
        connection.query(sql, [status, lease_id], function(error, results, fields) {
            return error ? reject(error) : resolve(results.affectedRows);
        });
    });
};

exports.delete_image_keys_from_lease = async function(lease_id) {
    const sql = "DELETE FROM Sublease_Images WHERE LeaseID = ?";
    return new Promise((resolve, reject) => {
        connection.query(sql, lease_id, function(error, results, fields) {
            return error ? reject(error) : resolve(results.affectedRows);
        });
    });
};

exports.delete_lease = async function(lease_id) {
    const sql = "DELETE FROM Sublease WHERE PostID = ?";
    return new Promise((resolve, reject) => {
        connection.query(sql, lease_id, function(error, results, fields) {
            return error ? reject(error) : resolve(results.affectedRows);
        });
    });
}

exports.delete_one_image_key_from_lease = async function(lease_id, image_key) {
    const sql = "DELETE FROM Sublease_Images WHERE LeaseID = ? AND ImageKey = ?";
    return new Promise((resolve, reject) => {
        connection.query(sql, [lease_id, image_key], function(error, results, fields) {
            return error ? reject(error) : resolve(results.affectedRows);
        });
    });
}