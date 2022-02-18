const Router = require('express');
const router = new Router();

const doctorControllers = require('../controllers/doctor');

router.post('/doc', doctorControllers.createDoctor);
router.get('/doc/:id', doctorControllers.getDoctor);
router.get('/doc', doctorControllers.getDoctors);

module.exports = router;