const db = require("../config/db");

exports.getAll = async () => {
    const [rows] = await db.query("SELECT * FROM tickets");
    return rows;
};

exports.getById = async (id_user) => {
    const [rows] = await db.query("SELECT * FROM tickets WHERE id_user = ?",[id_user]);
    return rows;
};


exports.createTurno = async (
    id_user,
    dateCreated,
    deliveryTime,
    status,
    description
) => {
    const [rows] = await db.query(
        "INSERT INTO `tickets` (`id_user`, `dateCreated`, `deliveryTime`, `status`, `description`) VALUES (?, ?, ?, ?, ?)",
        [id_user, dateCreated, deliveryTime, status, description]
    );
    return rows;
};

exports.updateTurno = async (id, datos) => {
    const campos = [];
    const params = [];

    if (datos.id_user != undefined && datos.id_user != null) {
        campos.push("id_user=?");
        params.push(datos.id_user);
    }

    if (datos.dateCreated != undefined && datos.dateCreated != null) {
        campos.push("dateCreated=?");
        params.push(datos.dateCreated);
    }
    if (datos.deliveryTime != undefined && datos.deliveryTime != null) {
        campos.push("deliveryTime=?");
        params.push(datos.deliveryTime);
    }

    if (datos.status != undefined && datos.status != null) {
        campos.push("status=?");
        params.push(datos.status);
    }

    if (datos.description != undefined && datos.description != null) {
        campos.push("description=?");
        params.push(datos.description);
    }

    const sql = `UPDATE tickets SET ${campos.join(", ")} WHERE id_ticket = ?`;
    params.push(id);

    const [rows] = await db.query(sql, params);
    return rows;
};

exports.deleteTurno = async (id_ticket) => {
    const [rows] = await db.query(
        "DELETE FROM tickets WHERE id_ticket = ?", [id_ticket]
    );
    return rows;
};
