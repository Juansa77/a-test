const passport = require('passport');

//* Middleware de Passport para autenticación
const isAuth = (req, res, next) => {
  console.log(req)
    if (req.isAuthenticated()) {
      return next(); // Usuario autenticado, continúa a la ruta protegida
    }
    res.status(401).json({ message: 'Acceso no autorizado' });
  };

  module.exports= isAuth