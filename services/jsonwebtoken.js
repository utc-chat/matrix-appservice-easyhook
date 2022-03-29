const jwt = require('jsonwebtoken')

class JSONWebToken{}

JSONWebToken.generateToken = function(body, secret, configOptions){
    return new Promise((resolve, reject) => {
        jwt.sign(
            body,
            secret,
            configOptions,
            (err, token) => {
                if (err) reject(err)
                resolve(token);
            });
    });
};

module.exports = JSONWebToken;