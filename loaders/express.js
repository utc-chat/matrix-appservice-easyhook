const express       = require('express');
const path          = require('path');
const logger        = require('morgan');
const cors          = require('cors');
const env           = process.env.NODE_ENV || 'development';
const config        = require('../config/config.js')[env];

exports.init = (app,store) => {
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cors());
    app.set('jwt-secret', config.secret)
};
