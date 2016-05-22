import * as config from 'config';
import * as mongoose from 'mongoose';

let db = mongoose.connect(config.get<string>('db.url')).connection;

export {db};