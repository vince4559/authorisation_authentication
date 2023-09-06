const express = require('express');
const { signUp, login, refresh_Token, logOut } = require('../controllers/userController');
const userRouter = express.Router();


userRouter.post('/signup', signUp);
userRouter.post('/login', login);
userRouter.get('/refresh', refresh_Token);
userRouter.get('/logout', logOut);


module.exports = userRouter;