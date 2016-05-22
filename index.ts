import * as config from 'config';
import {logger} from 'app/utils/logger.util';
import {db} from 'app/utils/db.util';
import {server} from 'app/app.module';

db.once('open', async function () {
    logger.info('listening on db');
    
    await server.start(config.server.port);
    logger.info(`server listening on port ${config.server.port}`);
});

db.on('error', (err: Error) => {
    logger.error(err);
});