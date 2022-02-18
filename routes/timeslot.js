const Router = require('express');
const router = new Router();

const timeslotControllers = require('../controllers/timeslot');

router.post('/appointment', timeslotControllers.createAppointment);
router.get('/appointment/:id', timeslotControllers.getAppointment);
router.get('/appointment', timeslotControllers.getAppointments);

module.exports = router;