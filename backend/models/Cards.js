const db = require('../db')

function createCard(user_id, card_info) {
    console.log(user_id, card_info)
        let sql = `
            INSERT INTO todolist_cards (user_id, title, description, status, due_date) 
            VALUES ($1, $2, $3, $4, $5);
        `
        return db.query(sql, [user_id, card_info.title, card_info.description, card_info.status, card_info.due_date])
        .then(res=>res.rows)
}

function editCard(card_info) {
    let title = card_info.updatedFields?.title || null;
    let description = card_info.updatedFields?.description || null;
    let status = card_info.status || null;
    let setValues = [];
    let queryParams = [];
    let index = 1

    if (title !== null) {
        setValues.push(`title = $${index}`);
        index++
        queryParams.push(title);
    }
    if (description !== null) {
        setValues.push(`description = $${index}`);
        index++
        queryParams.push(description);
    }
    if (status !== null) {
        setValues.push(`status = $${index}`);
        index++
        queryParams.push(status);
    }

    if (setValues.length === 0) {
        return Promise.resolve([]);
    }

    let setClause = setValues.join(", ");

    let sql = `
        UPDATE todolist_cards
        SET ${setClause}
        WHERE id = $${index}
        RETURNING *;
    `;
    
    queryParams.push(card_info.card_id);
    return db.query(sql, queryParams)
        .then(res => res.rows);
}


function deleteCard(card_id) {
    console.log(card_id)
    let sql = `
        Delete from todolist_cards WHERE id = $1 RETURNING *
    `
    return db.query(sql, [card_id])
    .then(res=>res.rows)
}

async function getCards(user_id) {
    let sql = `
        SELECT * FROM todolist_cards WHERE user_id = $1;
    `;
    const result = await db.query(sql, [user_id]);
    return result.rows; 
}

async function nextVal() {
    const sql = `SELECT nextval('todolist_cards_id_seq') AS next_id;`; 
    const result = await db.query(sql);
    return result.rows[0].next_id;  

}


const Cards = {
    createCard,
    deleteCard,
    editCard,
    getCards,
    nextVal
}

module.exports = Cards