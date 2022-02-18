const Router = require('express');
const router = new Router();

const userControllers = require('../controllers/user');

router.post('/user', userControllers.createUser);
router.get('/user/:id', userControllers.getUser);
router.get('/user', userControllers.getUsers);

module.exports = router;