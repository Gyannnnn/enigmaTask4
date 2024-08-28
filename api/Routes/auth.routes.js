const express = require('express');
const routes = express.Router();
const {hello ,signup, signin} = require('../Controller/auth.controller.js');

routes.get("/hello", hello);
routes.post("/auth/signup",signup);
routes.post("/auth/signin",signin)

module.exports = routes;
