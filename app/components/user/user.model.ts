import * as mongoose from 'mongoose';

const ROLE_ADMIN = 'admin';
const ROLE_USER = 'user';

let UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: ROLE_USER
    }
}, {
    toJSON: {
        transform: function (doc, ret) {
            return {
                id: ret._id,
                email: ret.email
            };
        }
    }
});

let UserModel = mongoose.model('User', UserSchema);

export {UserModel, ROLE_ADMIN};