const express =require('express');
const router = express.Router();
const todoControllers = require("../controllers/todos")


router.get('/todos', todoControllers.list);
router.get('/todos/:id', todoControllers.show);
router.post('/todos/', todoControllers.create);
router.put('/todos/:id', todoControllers.update);
router.delete('/todos/:id', todoControllers.remove);

module.exports = router;