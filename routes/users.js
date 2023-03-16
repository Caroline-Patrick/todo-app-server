const express =require('express');
const router = express.Router();
const userControllers = require("../controllers/users")


router.get('/users', userControllers.list);
router.get('/users/:id', userControllers.show);
router.post('/users/', userControllers.create);
router.put('/users/:id', userControllers.update);
router.delete('/users/:id', userControllers.remove);

module.exports = router;