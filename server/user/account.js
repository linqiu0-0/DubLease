const db = require('../data/database');
// const image_storage = require('../data/images');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    const user = {
        username: username,
        userid: userid,
    };

    // sign the json web token and return it to the user
    const token = jwt.sign(
        user,
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "7d",
        }
    );
    user.token = token;
    return {
        code : 200,
        msg : user,
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

    const user = {
        username: username,
        userid: userid,
    };

    // sign the json web token and return it to the user
    console.log(process.env);
    const token = jwt.sign(
        user,
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "7d",
        }
    );
    user.token = token;

    return {
        code: 200,
        msg: user,
    };
};

exports.get_user_profile = async function(user_id) {
    const exist = await db.check_user_id(user_id);
    if (!exist) {
        return {code: 400, msg: "User does not exist"};
    }

    const {username, email, phone} = await db.get_user_by_id(user_id);
    return {
        code: 200,
        msg: {
            username: username,
            email: email,
            phone: phone,
        }
    };
};

exports.edit_profile = async function(user_id, username, email, phone) {
    const exist = await db.check_user_id(user_id);
    if (!exist) {
        return {code: 400, msg: "User does not exist"};
    }
    const statements = []
    const values = [];

    if (username) {
        statements.push("UserName = ?");
        values.push(username);
    }

    if (email) {
        statements.push("UserEmail = ?");
        values.push(email);
    }

    if (phone) {
        statements.push("Phone = ?");
        values.push(phone);
    }

    var update_statements = "SET " + statements.join(", ");
    values.push(parseInt(user_id));
    await db.update_user(update_statements, values);
    return {
        code: 200,
        msg: "Success",
    }
}