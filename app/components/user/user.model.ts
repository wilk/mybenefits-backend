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
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            delete ret.password;
            
            return ret;
        }
    }
});

let UserModel = mongoose.model('User', UserSchema);

export {UserModel};