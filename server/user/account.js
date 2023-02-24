const db = require('../data/database');
// const image_storage = require('../data/images');
const bcrypt = require("bcrypt");

const cost_factor = 10;

// Process user signin request and return 
exports.signup = async function(email, password, username) {
    // check if either email already exists
    const duplicated = await db.check_email(email);
    if (duplicated) {
        return {code: 400, msg: "Email already exists"};
    }

    // Hash the password
    const password_hash = await bcrypt.hash(password, cost_factor);
    // Add the email, password, and username to the database
    const userid = await db.add_user(username, email, password_hash);
    return {
        code : 200,
        msg : {
            username: username,
            userid: userid,
        }
    };
};

exports.verify_login = async function(email, password) {
    // check if the email exists
    const exist = await db.check_email(email);
    if (!exist) {
        return {code: 400, msg: "Email does not exist"};
    }

    // retrieve user information
    const {userid, username, password_hash} = await db.get_user(email);
    // compare passwords
    const valid = await bcrypt.compare(password, password_hash);
    if (!valid) {
        return {code: 400, msg: "Incorrect Password"};
    }

    return {
        code : 200,
        msg : {
            username: username,
            userid: userid,
        }
    };
};

exports.get_user_profile = async function(user_id) {

};