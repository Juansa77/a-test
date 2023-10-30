const User = require("../models/user.model")
const passport = require('passport');



//*----REGISTER USER CONTROLLER------------

const register = async (req, res, next) => {
    const {  email, password, username } = req.body;
    await User.syncIndexes();
  console.log
    //* Validar que se proporcionen todos los campos necesarios
    if ( !email || !password || !username) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
  
    //* Crear un nuevo usuario: el password lo gestiona passport
    const newUser = new User({ username, email });
  
    //* Registrar al usuario con Passport y el método `register` de Passport-Local-Mongoose
    User.register(newUser, password, (err, user) => {
      if (err) {
        return res.status(500).json({ message: 'Error al registrar el usuario.' });
      }
    
      //* LOGIN DESPUÉS DE REGISTRO EXITOSO
      req.login(user, (loginErr) => {
        if (loginErr) {
          return res.status(500).json({ message: 'Error al iniciar sesión después del registro.' });
        }
        return res.status(201).json({ message: 'Success.' });
      });
    })
  };


  const login = (req, res, next) => {
    //* Utiliza la estrategia de autenticación local de Passport
    console.log(req.body)

    passport.authenticate('local', (err, user, info) => {
        //*el método de passport extrae el username y el poss
        console.log(user.username)
      if (err) {
        return res.status(500).json({ message: 'Error en la autenticación.' });
      }
      if (!user) {
        return res.status(401).json({ message: 'Credenciales incorrectas.' });
      }
  
      // Inicia sesión al usuario
      req.login(user, (loginErr) => {
        if (loginErr) {
          return res.status(500).json({ message: 'Error al iniciar sesión.' });
        }
  
        return res.status(200).json({ message: 'Inicio de sesión exitoso.', user: user });
      });
    })(req, res, next);
  };


  module.exports= {register, login}