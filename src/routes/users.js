import { Router } from 'express';
import controller from '../controllers/users.controller.js';
import authorize from "../middlewares/authorize.js";
const usersRouter = Router();

usersRouter.post('/register', controller.register);
usersRouter.post('/login', controller.login);
usersRouter.get('/profile', authorize, controller.profile);
usersRouter.get('/user', controller.findUserById)

export default usersRouter;