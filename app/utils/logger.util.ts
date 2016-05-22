import * as config from 'config';
import * as bunyan from 'bunyan';

let logger = bunyan.createLogger(config.get<any>('logger'));

export {logger};