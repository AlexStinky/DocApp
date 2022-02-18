const db = require('../db');

class UserController {
    async createUser (req, res) {
        try {
            const { first_name, last_name, phone} = req.body;
            const newUser = await db.query(`INSERT INTO person (first_name, last_name, phone) values ($1, $2, $3) RETURNING *`, [first_name, last_name, phone]);

            res.json(newUser.rows[0]);
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

    async getUser (req, res) {
        try {
            const id = req.params.id;
            const user = await db.query(`SELECT * FROM person WHERE id = $1`, [id]);

            res.json(user.rows[0]);
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

    async getUsers (req, res) {
        const users = await db.query(`SELECT * FROM person`);

        res.json(users.rows);
    }
};

module.exports = new UserController();