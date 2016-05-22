import {authCtrl} from './auth.controller';
import * as express from 'express';

let authRouter = express.Router();

authRouter.post('/register', authCtrl.register.bind(authCtrl));
authRouter.post('/login', authCtrl.login.bind(authCtrl));

export {authRouter};