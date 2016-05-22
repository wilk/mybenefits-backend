import * as mongoose from 'mongoose';

let AccountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    description: String
}, {
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            delete ret.userId;

            return ret;
        }
    }
});

let AccountModel = mongoose.model('Account', AccountSchema);

export {AccountModel};