const db = require('../db');
const reminder = require('../modules/reminder');

const SESSION = 30;

class TimeSlotController {
    async createAppointment (req, res) {
        try {
            const { person_id, doctor_id, time_slot } = req.body;
            const time_start = new Date(`${time_slot}`);
            const time_end = new Date(`${time_slot}`);
            time_end.setMinutes(time_end.getMinutes() + SESSION);

            const timeSlots = await db.query(`SELECT * FROM timeslot WHERE doctor_id = $1`, [doctor_id]);

            if (timeSlots.rows.length < 1) {
                return res.status(400).json(
                    {
                        "status": "error",
                        "code": 400,
                        "message": "Врач не найден"
                    }
                );
            }

            const current_date = new Date();
            const check = timeSlots.rows.reduce((acc, el, index, arr) => {
                if (el.time_start <= time_start && el.time_end >= time_start) {
                    return false;
                }

                if (index === (arr.length - 1)) {
                    return true;
                }
            }, true);

            if (check && time_start > current_date) {
                const newAppointment = await db.query(`INSERT INTO timeslot (person_id, doctor_id, time_start, time_end) values ($1, $2, $3, $4) RETURNING *`, [person_id, doctor_id, time_start, time_end]);

                await reminder.createRemind(time_start, person_id, doctor_id, time_slot);

                return res.json(newAppointment.rows[0]);
            } else {
                return res.status(400).json(
                    {
                        "status": "error",
                        "code": 400,
                        "message": "Вы не можете записаться на это время"
                    }
                );
            }
        } catch (err) {
            res.status(400).json(
                {
                    "status": "error",
                    "code": 400,
                    "message": err.where
                }
            );
        }
    }

    async getAppointment (req, res) {
        try {
            const id = req.params.id;
            const appointment = await db.query(`SELECT * FROM timeslot WHERE doctor_id = $1`, [id]);

            res.json(appointment.rows);
        } catch (err) {
            res.status(400).json(
                {
                    "status": "error",
                    "code": 400,
                    "message": err.where
                }
            );
        }
    }

    async getAppointments (req, res) {
        const appointments = await db.query(`SELECT * FROM timeslot`);

        res.json(appointments.rows);
    }
};

module.exports = new TimeSlotController();