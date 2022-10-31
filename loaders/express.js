const express = require("express");
const httpStatus = require('http-status-codes');

const routes = require("../api");

const expressLoader = async (app) => {
    app.use(express.json());
    app.use(routes());
    app.listen(3000, () => {
        console.log("on port 3000");
    })
    app.use((req, res, next) => {
        const err = new Error('Not Found');
        err['status'] = 404;
        next(err);
    });

    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.json({
            errors: {
                message: err.message,
            },
        });
    });
}
module.exports = expressLoader;