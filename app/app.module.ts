import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import {authMiddleware} from './middlewares/auth.middleware';
import {errorMiddleware} from './middlewares/error.middleware';
import {loggerMiddleware} from './middlewares/logger.middleware';
import {userRouter} from './components/user/user.router';
//import {transactionRouter} from './components/transaction/transaction.router';
import {accountRouter} from './components/account/account.router';
import {authRouter} from './components/auth/auth.router';

let app = express();

app.use(loggerMiddleware);
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {res.send('lol')});

app.use('/auth', authRouter);

app.use('/api/users', /*authMiddleware,*/ userRouter);
app.use('/api/accounts', /*authMiddleware,*/ accountRouter);
//app.use('/api/transactions', authMiddleware, transactionRouter);

app.use(errorMiddleware);

class Server {
    app: any;
    
    constructor(app: any) {
        this.app = app;
    }
    
    async start(port: number): Promise<any> {
        return new Promise(resolve => {
            this.app.listen(port, () => {
                resolve();
            });
        });
    }
    
    async stop(): Promise<any> {
        return new Promise(resolve => {
            this.app.close(() => {
                resolve();
            });
        });
    }
}

let server = new Server(app);

export {server};