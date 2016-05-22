import {userCtrl} from './user.controller';
import * as express from 'express';

let userRouter = express.Router();

userRouter.route('/:id')
    .get(userCtrl.single.bind(userCtrl))
    .put(userCtrl.update.bind(userCtrl))
    .delete(userCtrl.delete.bind(userCtrl));

export {userRouter};