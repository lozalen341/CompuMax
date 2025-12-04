const Users = require("../models/userModel");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


/**
 * Crea un nuevo usuario en el sistema
 * @async
 * @function createUser
 * @param {Object} req - Objeto de solicitud de Express
 * @param {Object} req.body - Cuerpo de la solicitud
 * @param {string} req.body.name - Nombre del usuario
 * @param {string} req.body.lastname - Apellido del usuario
 * @param {string} req.body.email - Email del usuario
 * @param {string} req.body.type - Tipo de usuario ('user' o 'admin')
 * @param {string} req.body.password - Contraseña del usuario
 * @param {Object} res - Objeto de respuesta de Express
 * @returns {Promise<void>} Respuesta JSON con el usuario creado o error
 * @throws {Error} Si el tipo de usuario no es válido o hay un error en la base de datos
 */
exports.createUser = async (req, res) => {
    try {
        let { name, lastname, email, type, password } = req.body;

        if (type === "user") type = 1;
        else if (type === "admin") type = 0;
        else return res.status(400).json({ error: "El tipo de usuario no es válido" });

        // verificar si ya existe el mail
        const existingUser = await Users.getByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: "El email ya está registrado" });
        }

        // encriptar la contraseña
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const create = await Users.createUser(
            name,
            lastname,
            email,
            type,
            hashedPassword
        );

        return res.status(201).json({
            ok: true,
            message: "Usuario creado correctamente",
            user: create
        });
    } catch (error) {
        console.log("Error en createUser:", error);
        return res.status(500).json({
            error: "Error interno del servidor"
        });
    }
};


/**
 * Obtiene todos los usuarios del sistema
 * @async
 * @function getAllUsers
 * @param {Object} req - Objeto de solicitud de Express
 * @param {Object} res - Objeto de respuesta de Express
 * @returns {Promise<void>} Respuesta JSON con la lista de usuarios o error
 * @throws {Error} Si hay un error al consultar la base de datos
 */
exports.getAllUsers = async (req, res) => {
    try {
        const user = await Users.getAll();
        res.json({ ok: true, user: user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Obtiene un usuario específico por su ID
 * @async
 * @function getById
 * @param {Object} req - Objeto de solicitud de Express
 * @param {Object} req.params - Parámetros de la URL
 * @param {string} req.params.id - ID del usuario a buscar
 * @param {Object} res - Objeto de respuesta de Express
 * @returns {Promise<void>} Respuesta JSON con el usuario encontrado o error
 * @throws {Error} Si hay un error al consultar la base de datos
 */
exports.getById = async (req, res) => {
    try {
        const id_user = req.params.id;
        const user = await Users.getById(id_user);
        res.json({ ok: true, user: user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Actualiza los datos de un usuario existente
 * @async
 * @function updateUser
 * @param {Object} req - Objeto de solicitud de Express
 * @param {Object} req.params - Parámetros de la URL
 * @param {string} req.params.id - ID del usuario a actualizar
 * @param {Object} req.body - Datos a actualizar
 * @param {string} [req.body.name] - Nuevo nombre del usuario
 * @param {string} [req.body.lastname] - Nuevo apellido del usuario
 * @param {string} [req.body.email] - Nuevo email del usuario
 * @param {int} [req.body.phone] - Nuevo telefono del usuario
 * @param {string} [req.body.address] - Nueva direccion del usuario
 * @param {string} [req.body.type] - Nuevo tipo de usuario ('user' o 'admin')
 * @param {Object} res - Objeto de respuesta de Express
 * @returns {Promise<void>} Respuesta JSON con el usuario actualizado o error
 * @throws {Error} Si el tipo de usuario no es válido o hay un error en la base de datos
 */
exports.updateUser = async (req, res) => {
    try {
        const id_user = req.params.id;
        const datos = req.body;
        let { type } = req.body;

        // Convertir el tipo de usuario si está presente
        if (type != undefined && type != null) {
            if (type === "user") {
                type = 1;
            } else if (type === "admin") {
                type = 0;
            } else {
                return res.status(400).json({ error: "El tipo de usuario no es válido" });
            }

            datos.type = type;
        }

        const update = await Users.updateUser(id_user, datos);
        res.json({ ok: true, user: update });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Cambia la contraseña de un usuario
 * @async
 * @function changePsw
 * @param {Object} req - Objeto de solicitud de Express
 * @param {Object} req.params - Parámetros de la URL
 * @param {string} req.params.id - ID del usuario
 * @param {Object} req.body - Cuerpo de la solicitud
 * @param {string} req.body.currentPassword - Contraseña actual del usuario
 * @param {string} req.body.newPassword - Nueva contraseña del usuario
 * @param {Object} res - Objeto de respuesta de Express
 * @returns {Promise<void>} Respuesta JSON confirmando el cambio o error
 * @throws {Error} Si la contraseña actual es incorrecta o el usuario no existe
 */
exports.changePsw = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const id = req.params.id;

        // Verificar que el usuario existe
        const user = await Users.getById(id);

        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        // Verificar que la contraseña actual es correcta
        const valid = await bcrypt.compare(currentPassword, user[0].password);
        if (!valid) {
            return res.status(401).json({ error: "La contraseña actual es incorrecta" });
        }

        // Encriptar la nueva contraseña
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await Users.changePsw(id, hashedPassword);

        res.json({ ok: true, message: "Contraseña actualizada" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Elimina un usuario del sistema
 * @async
 * @function deleteUser
 * @param {Object} req - Objeto de solicitud de Express
 * @param {Object} req.params - Parámetros de la URL
 * @param {string} req.params.id - ID del usuario a eliminar
 * @param {Object} res - Objeto de respuesta de Express
 * @returns {Promise<void>} Respuesta JSON confirmando la eliminación o error
 * @throws {Error} Si hay un error al eliminar de la base de datos
 */
exports.deleteUser = async (req, res) => {
    try {
        const id_user = req.params.id;
        const deleteUsr = await Users.deleteUser(id_user);
        res.json({ ok: true, user: deleteUsr });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Autentica a un usuario y genera un token JWT
 * @async
 * @function login
 * @param {Object} req - Objeto de solicitud de Express
 * @param {Object} req.body - Cuerpo de la solicitud
 * @param {string} req.body.email - Email del usuario
 * @param {string} req.body.password - Contraseña del usuario
 * @param {Object} res - Objeto de respuesta de Express
 * @returns {Promise<void>} Respuesta JSON con token JWT y datos del usuario o error
 * @throws {Error} Si las credenciales son incorrectas o faltan datos
 */
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(401).json({ error: "Es necesario el email y la contraseña" });
        }

        const user = await Users.login(email);
        console.log("Respuesta Users.login:", user);

        if (!user) {
            return res.status(401).json({ error: "Usuario no encontrado" });
        }

        // Puede venir como array o como objeto|
        const usr = Array.isArray(user) ? user[0] : user;

        if (!usr) {
            return res.status(401).json({ error: "Usuario no encontrado" });
        }

        if (!usr.password) {
            return res.status(500).json({ error: "Error interno: usuario sin contraseña" });
        }

        const valid = await bcrypt.compare(password, usr.password);
        if (!valid) {
            return res.status(401).json({ error: "Contraseña incorrecta" });
        }

        const token = jwt.sign(
            { id: usr.id_user, email: usr.email, type: usr.type },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.json({
            message: "Se inicio sesion correctamente",
            token,
            user: { id: usr.id_user, email: usr.email, type: usr.type }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};

/**
 * Cierra la sesión del usuario
 * @function logout
 * @param {Object} req - Objeto de solicitud de Express
 * @param {Object} res - Objeto de respuesta de Express
 * @returns {Object} Respuesta JSON confirmando el cierre de sesión
 */
exports.logout = (req, res) => {
    try {
        // En una implementación con tokens, aquí podríamos invalidar el token si es necesario
        // Por ahora, simplemente devolvemos una respuesta exitosa
        return res.status(200).json({
            ok: true,
            message: 'Sesión cerrada correctamente'
        });
    } catch (error) {
        console.error('Error en logout:', error);
        return res.status(500).json({
            ok: false,
            error: 'Error al cerrar sesión'
        });
    }
};
