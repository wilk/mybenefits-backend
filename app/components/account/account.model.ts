import * as mongoose from 'mongoose';

// @todo: replace this model with a TreeModel
let AccountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    description: String,
    balance: {
        type: Number,
        default: 0
    }
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