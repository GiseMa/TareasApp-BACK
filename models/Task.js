import { Schema, model } from "mongoose";

const TaskSchema = Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String
    },
    type: {
        type: String
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date
    },
    completed: {
        type: Boolean,
        default: false,

    },
    eliminated: {
        type: Boolean,
        default: false,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

TaskSchema.method('toJSON', function() {
    const {_v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
});

export default model('Task', TaskSchema);
