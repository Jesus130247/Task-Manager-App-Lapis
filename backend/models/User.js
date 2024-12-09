const db = require('../db')

function createUser(username, hash) {
        let sql = `
        INSERT INTO todolist_users
        (username, password_disgest) 
        VALUES ($1, $2)
        RETURNING *;
        `
        return db.query(sql, [username, hash])
        .then(res=>res.rows)
}

function findByUsername(username) {
    let sql = `
    SELECT * FROM todolist_users WHERE username = $1;
    `
    return db.query(sql, [username])
            .then(result => {
                if(result.rowCount === 0) {
                    let err = new Error('resource not found')
                    err.status = 400
                    throw err
                }
                return result.rows[0]
            })
}

function deleteUser(username, hash) {
    let sql = `
    INSERT INTO todolist_users
    (username, password_disgest) 
    VALUES ($1, $2)
    RETURNING *;
    `
    return db.query(sql, [username, hash])
    .then(res=>res.rows)
}

const User = {
    deleteUser,
    createUser,
    findByUsername
  
}

module.exports = User