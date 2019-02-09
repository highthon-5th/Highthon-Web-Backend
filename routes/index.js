import express from 'express'

module.exports = function(app) {
    app.get('/', function(req, res) {
        console.log('123');

    })
}