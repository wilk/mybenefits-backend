import * as config from 'config';
import * as mongoose from 'mongoose';

let db = mongoose.connect(config.db.url);

export {db};