const express = require("express");
const userRoutes = express.Router()
const {register, login}= require("../controllers/user.controllers");
const isAuth = require("../../middlewares/isAuth.middleware");



//?------Ruta REGISTER USER--------
userRoutes.post("/register", register);

//?------Ruta  LOGIN--------
userRoutes.get("/login", login);

module.exports= userRoutes