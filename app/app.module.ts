import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import {authMiddleware} from 'app/middlewares/auth.middleware';
import {errorMiddleware} from 'app/middlewares/error.middleware';
import {loggerMiddleware} from 'app/middlewares/logger.middleware';
import {userRouter} from 'app/components/user/user.router';
import {transactionRouter} from 'app/components/transaction/transaction.router';
import {accountRouter} from 'app/components/account/account.router';
import {authRouter} from 'app/components/auth/auth.router';

let app = express();

app.use(loggerMiddleware);
app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRouter);

app.use('/api/users', authMiddleware, userRouter);
app.use('/api/accounts', authMiddleware, userRouter);
app.use('/api/transactions', authMiddleware, userRouter);

app.use(errorMiddleware);

class Server {
    app: any;
    
    constructor(app: any) {
        this.app = app;
    }
    
    async start(port: number): Promise<void> {
        return new Promise(resolve => {
            this.app.listen(port, () => {
                resolve();
            });
        });
    }
    
    async stop(): Promise<void> {
        return new Promise(resolve => {
            this.app.close(() => {
                resolve();
            });
        });
    }
}

let server = new Server(app);

export {server};