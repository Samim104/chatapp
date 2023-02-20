const router = require('express').Router()
const userController = require('../controller/userController')

router.post('/signup', userController.signup)
router.post('/login', userController.login)
router.get('/:id', userController.getuser)
module.exports = router