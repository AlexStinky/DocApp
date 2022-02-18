const fs = require('fs');
const filePath = 'reminder.txt';

const db = require('../db');

async function createRemind (time, person_id, doctor_id, time_slot) {
    const current_date = new Date();
    const per2Hours = (time.setHours(time.getHours() - 2) - current_date);
    const perDay = (time.setHours(time.getHours() - 22) - current_date);

    if (perDay > 0) {
        setTimeout(createMessage, perDay, true, person_id, doctor_id, time_slot);
    }

    if (per2Hours > 0) {
        setTimeout(createMessage, per2Hours, false, person_id, doctor_id, time_slot);
    }
}

const createMessage = async (time, person_id, doctor_id, time_slot) => {
    const current_date = new Date();

    const person = await db.query(`SELECT * FROM person WHERE id = $1`, [person_id]);
    const doctor = await db.query(`SELECT * FROM doctor WHERE id = $1`, [doctor_id]);

    const message = (time) ?
        `${current_date} | Привет ${person.rows[0].first_name} ${person.rows[0].last_name}! Напоминаем что вы записаны к ${ doctor.rows[0].spec } завтра в ${time_slot}!` :
        `${ current_date } | Привет ${ person.rows[0].first_name } ${ person.rows[0].last_name }! Вам через 2 часа к ${ doctor.rows[0].spec } в ${time_slot}!`;

    sendMessage(message);
}

const sendMessage = async (message) => {
    let fileContent = fs.readFileSync(filePath, 'utf8');

    fileContent += `\n\n${message}`;

    fs.writeFileSync(filePath, fileContent);
}


module.exports = {
    createRemind
}