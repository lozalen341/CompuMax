const db = require('../config/db')

exports.createUser = async (name, lastname, email, type, password) => {
    const [rows] = await db.query(
        'INSERT INTO `users` (`id_user`, `name`, `lastname`, `email`, `type`, `password`) VALUES (NULL, ?, ?, ?, ?, ?)',
        [name, lastname, email, type, password]
    );
    return rows;
}

exports.getAll = async () => {
    const [rows] = await db.query('SELECT * FROM users')
    return rows;
}

exports.getById = async (id_user) => {
    const [rows] = await db.query("SELECT * FROM users WHERE id_user = ?", [id_user]);
    return rows;
}

exports.getByEmail = async (email) => {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ? LIMIT 1", [email]);
    return rows.length > 0 ? rows[0] : null;
}

exports.getByEmail = async (email) => {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0];
};

exports.updateUser = async (id, datos) => {
    const campos = []
    const params = []

    const array = ["name", "lastname", "email", "type", "password"]

    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        
        if (datos[element] != undefined && datos.element != null) {
            campos.push(`${element}=?`)
            params.push(datos[element])
        }
    }
    
    const sql = `UPDATE users SET ${campos.join(", ")} WHERE id_user = ?`;
    params.push(id)

    const [rows] = await db.query(sql, params);
    return rows;
}

exports.changePsw = async (id, password) => {
    const [rows] = await db.query('UPDATE users SET password = ? WHERE id_user = ?', [password, id]);
    return rows;
}

exports.deleteUser = async (id_user) => {
    const [rows] = await db.query('DELETE FROM users WHERE id_user = ?', [id_user])
    return rows;
}

exports.login = async (email) => {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
}