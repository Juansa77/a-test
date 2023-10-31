const express = require("express");
const userRoutes = express.Router();
const {
  register,
  login,
  updateUser,
  deleteUserByID,
} = require("../controllers/user.controllers");
const isAuth = require("../../middlewares/isAuth.middleware");
const isAuthToken = require("../../middlewares/isAuthToken.middleware");

//?------Ruta REGISTER USER--------
userRoutes.post("/register", register);

//?------Ruta  LOGIN--------
userRoutes.get("/login", login);

//?------Ruta  UPDATE --------
userRoutes.patch("/update/:id", isAuthToken, updateUser);

//?------Ruta  DELETE USER BY ID--------
userRoutes.delete("/delete/:id", isAuthToken, deleteUserByID);

module.exports = userRoutes;
