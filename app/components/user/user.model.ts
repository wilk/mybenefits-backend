import * as mongoose from 'mongoose';

let UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
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

export {UserModel};