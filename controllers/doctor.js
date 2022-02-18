const db = require('../db');

class DoctorController {
    async createDoctor (req, res) {
        try {
            const { first_name, last_name, spec } = req.body;
            const newDoc = await db.query(`INSERT INTO doctor (first_name, last_name, spec) values ($1, $2, $3) RETURNING *`, [first_name, last_name, spec]);

            res.json(newDoc.rows[0]);
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

    async getDoctor (req, res) {
        try {
            const id = req.params.id;
            const doc = await db.query(`SELECT * FROM doctor WHERE id = $1`, [id]);

            res.json(doc.rows[0]);
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

    async getDoctors (req, res) {
        const docs = await db.query(`SELECT * from doctor`);

        res.json(docs.rows);
    }
};

module.exports = new DoctorController();