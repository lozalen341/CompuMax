const Turnos = require("../models/turnosModel");

/**
 * Obtiene todos los turnos del sistema
 * @async
 * @function getAllTurnos
 * @param {Object} req - Objeto de solicitud de Express
 * @param {Object} res - Objeto de respuesta de Express
 * @returns {Promise<void>} Respuesta JSON con la lista de turnos o error
 * @throws {Error} Si hay un error al consultar la base de datos
 */
exports.getAllTurnos = async (req, res) => {
    try {
        const turnos = await Turnos.getAll();

        res.json({ ok: true, turno: turnos });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Obtiene todos los turnos asociados a un usuario específico
 * @async
 * @function getAllById
 * @param {Object} req - Objeto de solicitud de Express
 * @param {Object} req.params - Parámetros de la URL
 * @param {string} req.params.id_user - ID del usuario para filtrar turnos
 * @param {Object} res - Objeto de respuesta de Express
 * @returns {Promise<void>} Respuesta JSON con los turnos del usuario o error
 * @throws {Error} Si hay un error al consultar la base de datos
 */
exports.getAllById = async (req, res) => {
    try {
        const id_user = req.params.id_user;
        const turnos = await Turnos.getById(id_user);

        res.json({ ok: true, turno: turnos });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Crea un nuevo turno en el sistema
 * @async
 * @function createTurno
 * @param {Object} req - Objeto de solicitud de Express
 * @param {Object} req.body - Cuerpo de la solicitud
 * @param {number} req.body.id_user - ID del usuario que crea el turno
 * @param {string} req.body.dateCreated - Fecha de creación del turno
 * @param {string} req.body.deliveryTime - Fecha y hora de entrega/finalización
 * @param {string} req.body.status - Estado del turno (ej: pendiente, en_proceso, completado)
 * @param {string} req.body.description - Descripción detallada del turno
 * @param {Object} res - Objeto de respuesta de Express
 * @returns {Promise<void>} Respuesta JSON con el turno creado o error
 * @throws {Error} Si hay un error al crear el turno en la base de datos
 */
exports.createTurno = async (req, res) => {
    try {
        let { id_user, dateCreated, deliveryTime, status, description, service } = req.body;

        // Si el cliente no manda `service` por separado, intentar parsearlo desde `description`
        if ((!service || service.toString().trim() === "") && description) {
            const raw = description.toString();
            const idx = raw.indexOf(":");
            if (idx !== -1) {
                service = raw.slice(0, idx).trim();
                description = raw.slice(idx + 1).trim();
            } else {
                service = "";
            }
        }

        const create = await Turnos.createTurno(
            id_user,
            dateCreated,
            deliveryTime,
            status,
            service,
            description
        );
        
        res.json({ ok: true, turno: create });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Actualiza un turno existente
 * @async
 * @function updateTurno
 * @param {Object} req - Objeto de solicitud de Express
 * @param {Object} req.params - Parámetros de la URL
 * @param {string} req.params.id - ID del turno (id_ticket) a actualizar
 * @param {Object} req.body - Datos a actualizar
 * @param {string} [req.body.deliveryTime] - Nueva fecha de entrega
 * @param {string} [req.body.status] - Nuevo estado del turno
 * @param {string} [req.body.description] - Nueva descripción
 * @param {Object} res - Objeto de respuesta de Express
 * @returns {Promise<void>} Respuesta JSON con el turno actualizado o error
 * @throws {Error} Si hay un error al actualizar el turno en la base de datos
 */
exports.updateTurno = async (req, res) => {
    try {
        const id_ticket = req.params.id;
        const datos = req.body;

        // Si recibimos una descripción combinada, separarla en service+description
        if (datos.description && (!datos.service || datos.service.toString().trim() === "")) {
            const raw = datos.description.toString();
            const idx = raw.indexOf(":");
            if (idx !== -1) {
                datos.service = raw.slice(0, idx).trim();
                datos.description = raw.slice(idx + 1).trim();
            }
        }

        const update = await Turnos.updateTurno(id_ticket, datos);
        res.json({ ok: true, turno: update });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Elimina un turno del sistema
 * @async
 * @function deleteTurno
 * @param {Object} req - Objeto de solicitud de Express
 * @param {Object} req.params - Parámetros de la URL
 * @param {string} req.params.id_user - ID del turno a eliminar
 * @param {Object} res - Objeto de respuesta de Express
 * @returns {Promise<void>} Respuesta JSON confirmando la eliminación o error
 * @throws {Error} Si hay un error al eliminar el turno de la base de datos
 */
exports.deleteTurno = async (req, res) => {
    try {
        const id_user = req.params.id_user;
        const deleteTurn = await Turnos.deleteTurno(id_user);

        res.json({ ok: true, turno: deleteTurn });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};