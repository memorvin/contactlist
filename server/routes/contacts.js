"use strict"

const router = require('express').Router();
const contactController = require('../controllers/contactController.js');
const { authorization } = require('../middlewares/auth');

router.post('/', contactController.create);
router.get('/', contactController.getAll);
router.get('/:id', authorization, contactController.getOne);
router.delete('/:id', authorization, contactController.remove);
router.patch('/:id', authorization, contactController.update);

module.exports = router;