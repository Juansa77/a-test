const express = require("express");
const userRoutes = express.Router();
const {
  register,
  login,
  updateUser,
  deleteUserByID,
  getAllUser, logOut,
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

//?------Ruta  GET ALL USER--------
userRoutes.get("/getusers/", isAuthToken, getAllUser);

//?------- Ruta para el logout
userRoutes.get("/logout", isAuthToken, logOut);

module.exports = userRoutes;
