const express = require('express')
const router = express.Router()
const {
       userValidation
} = require('../../middlewares/validationMiddlewares')
const {
  usersMiddleware,
} = require('../../middlewares/usersMiddlewares')

const {
    registrationController,
    loginController,
    logoutController,
    currentController,
    getUserByIdController,
    updateUserByIdController
} = require('../../controllers/usersController')

const {asyncWrapper} = require('../../helpers/apiHelpers')

router.post('/register' ,userValidation, asyncWrapper(registrationController))//CREATE USER
router.post('/login',  asyncWrapper(loginController)) 
router.post('/logout', usersMiddleware, asyncWrapper(logoutController))
router.get('/current',usersMiddleware, asyncWrapper(currentController))// USER WITH TOKEN THAT SPECIFIED IN HEADERS
router.get('/:id', asyncWrapper(getUserByIdController)) 
router.put('/:id', userValidation , asyncWrapper(updateUserByIdController))

module.exports = router