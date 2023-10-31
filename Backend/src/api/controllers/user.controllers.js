const User = require("../models/user.model");
const passport = require("passport");
const { generateToken } = require("../../utils/token");

//?----REGISTER USER CONTROLLER------------

const register = async (req, res, next) => {
  const { email, password, username } = req.body;
  await User.syncIndexes();
  console.log;
  //* Validar que se proporcionen todos los campos necesarios
  if (!email || !password || !username) {
    return res.status(400).json({ message: "All fields are required." });
  }

  //* Crear un nuevo usuario: el password lo gestiona passport
  const newUser = new User({ username, email });

  //* Registrar al usuario con Passport y el método `register` de Passport-Local-Mongoose
  User.register(newUser, password, (err, user) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error al registrar el usuario." });
    }

    //* LOGIN DESPUÉS DE REGISTRO EXITOSO
    req.login(user, (loginErr) => {
      if (loginErr) {
        return res
          .status(500)
          .json({ message: "Error al iniciar sesión después del registro." });
      }
      //*Ruta de redirección después del login
     // res.redirect('http://localhost:8490/api/v1/users/getusers');
     //*SALVAR SESSION AL HACER EL LOGIN
      req.session.save(()=>{
        return res.status(201).json({ message: "Success.", user: newUser, redirectTo: "/users" });
      })
    });
  });
};

//?-----------LOGIN USER CONTROLLER ---------- */

const login = (req, res, next) => {
  //* Utiliza la estrategia de autenticación local de Passport
  console.log(req.body);
  //* Extraemos la id del username para generar el toquen

  passport.authenticate("local", (err, user, info) => {
    //*el método de passport extrae el username y el poss

    if (err) {
      return res.status(500).json({ message: "Error en la autenticación." });
    }
    if (!user) {
      return res.status(401).json({ message: "Credenciales incorrectas." });
    }
    const payload = {
      username: user.username,
    };

    //* Generamos un token JWT utilizando la función importada
    const token = generateToken(payload.username);
    req.login(user, (loginErr) => {
      if (loginErr) {
        return res.status(500).json({ message: "Error al iniciar sesión." });
      }
      //* Si OK, devolvemos el user y el token
      //res.redirect('http://localhost:8490/api/v1/users/getusers');
      return res.status(200).json({
        message: "Inicio de sesión exitoso.",
        user: user,
        token: token,
      });
    });
  })(req, res, next);
};

//?-----------LOG-OUT USER CONTROLLER ---------- */
const logOut = (req, res, next) => {
  //* Recuerda que la función de logout de passport requiere de un callback
  req.logout(function (err) {
    if (err) {
      return next(err);
    }

    req.session.logoutMessage = "Session closed";
    res.status(200).json({ message: "¡Has cerrado sesión exitosamente!" });
  });
};
//?-----------UPDATE USER CONTROLLER ---------- */

//* Updated por ID, todos los campos modificables
const updateUser = async (req, res, next) => {
  try {
    await User.syncIndexes();
    const { id } = req.params;

    //* Verificar si la ID del user es válida
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // Actualizar el USER con los datos proporcionados en req.body
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    // Verificar si se actualizó correctamente
    if (!updateUser) {
      return res.status(404).json({ message: "User not found" });
    }
    //* Devolvemos el user actualizado y mensaje de confirmación
    return res.status(200).json({ message: "User updated", user: updatedUser });
  } catch (error) {
    return next(error);
  }
};

//?-----------GET ALL USER------------

const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find();
    //*Si hay, devolvemos 200
    if (users) {
      return res.status(200).json(users );
    }
    //* Si no hay users
    if (!users) {
      return res.status(404).json({ message: "No users in DB" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

//?-----------USER  DELETE BY ID------------

const deleteUserByID = async (req, res, next) => {
  const { id } = req.params;

  try {
    //* Buscamos el user por id
    const user = await User.findById(id);

    //* Si no hay, devolvemos error
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //* Eliminamos el usuario de la base de datos
    const deletedUser = await User.findByIdAndDelete(id);
    //*Si OK, devolvemos confirmación
    if (deletedUser) {
      return res
        .status(200)
        .json({ message: "User removed from the DB", user: user });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  register,
  login,
  updateUser,
  deleteUserByID,
  getAllUser,
  logOut,
};
