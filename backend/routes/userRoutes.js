const express = require('express')
const router = express.Router()

// const usersController = require('../controllers/usersController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

// router.get('/count', usersController.getUsersCount);

module.exports = router