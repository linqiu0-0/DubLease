// Process user signin request and return 
exports.signup = function(req, resp) {
    // Prepare output in JSON format
    response = {
        email:req.body.email,
        password:req.body.password,
        username:req.body.username
    };
    console.log(response);
    resp.end(JSON.stringify(response));
};

exports.verify_signin = function(req, resp) {
    // Prepare output in JSON format
    response = {
        email:req.body.email,
        password:req.body.password
    };
    console.log(response);
    resp.end(JSON.stringify(response));
};