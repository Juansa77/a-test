const express = require("express");
const dotenv = require("dotenv");
const connect = require("./src/utils/db");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./src/api/models/user.model");
const userRoutes = require("./src/api/routes/user.routes");
const session = require("express-session");
const bodyParser = require("body-parser");
const passportConfig = require("./src/api/config/passport.config");


dotenv.config()
//* CONFIGURACIÓN Y EXPORTS PARA EXTRAER TOKEN CON PASSPORT

const secret = process.env.JWT_SECRET
const passportJWT = require('passport-jwt');

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret // 
};

const jwtStrategy = new JwtStrategy(jwtOptions, (jwtPayload, done) => {

});

passport.use(jwtStrategy);




//* Declaración del puerto
const PORT = 8490;
//* Creamos la APP de express
const app = express();

//* CONFIGURACIÓN DE PASSPORT SESSIÓN

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "548515EWR35", //* PASARLO A .ENV
    resave: false,
    saveUninitialized: false,
  })
);

//*----INICIALIZACIÓN DE  PASSPORT---------
app.use(passport.initialize());
app.use(passport.session());

passportConfig()
/*
//*Almacenamiento en la sesión
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//* Estrategia de verificación local
passport.use(new LocalStrategy(User.authenticate()));

*/
//* Iniciamos la conexión a la DB
connect();

//* Configuramos la api---------------
app.use((req, res, next) => {
  //Ponemos asterisco para deshabiliar el control origin
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  /// LAS ACCIONES QUE PERMITIMOS EN NUESTRA API
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.header("Allow", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  next();
});

//!-----------------------------------------
//?-----------SERVER CONFIG--------------
//!-----------------------------------------

//Indicamos que vamos a usar JSON y el límite de data
app.use(express.json({ limit: "5mb" }));
//ponemos urlencoded a true àra los POST  y los PUT porque enviamos data que queremos los almacene el servidor (esto no es necesario si solo vamos a tener get o delete)
app.use(express.urlencoded({ limit: "5mb", extended: false }));

//*Indicamos que app use las controladores de usuario definidos en user.routes
app.use("/api/v1/users", userRoutes);

//definimos la respuesta para ruta desconocida
app.use("*", (req, res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  next(error);
});

//iniciamos el servidor en el puerto definido

app.listen(PORT, () => {
  console.log(`Server running on  http://localhost:${PORT}`);
});
