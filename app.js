const express = require('express');

const userRouter = require('./routes/user');
const docRouter = require('./routes/doctor');
const timeRouter = require('./routes/timeslot');

const db = require('./db');
const reminder = require('./modules/reminder');

const app = express();

const PORT = process.env.PORT || 5000;

const TWO_HOURS = 7200000;

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use('/api', userRouter);
app.use('/api', docRouter);
app.use('/api', timeRouter);

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));

(async () => {
    const current_date = new Date();
    const appointments = await db.query(`SELECT * FROM timeslot`);

    appointments.rows.forEach(async (el) => {
        if (el.time_start - current_date > TWO_HOURS) {
            await reminder.createRemind(el.time_start, el.person_id, el.doctor_id, el.time_start);
        }
    });
})();