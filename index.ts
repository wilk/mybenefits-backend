import * as config from 'config';
import {logger} from './app/utils/logger.util';
import {db} from './app/utils/db.util';
import {server} from './app/app.module';

db.once('open', async function () {
    logger.info('listening on db');

    let port = config.get<number>('server.port');
    
    await server.start(port);
    logger.info(`server listening on port ${port}`);
});

db.on('error', (err: Error) => {
    logger.error(err);
});