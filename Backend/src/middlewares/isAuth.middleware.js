

//* Middleware de Passport para autenticación
const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next(); // Usuario autenticado, continúa a la ruta protegida
    }
    res.status(401).json({ message: 'Acceso no autorizado' });
  };

  module.exports= isAuth