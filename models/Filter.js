import {Schema, model} from "mongoose";

const FilterSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    filterType: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
    multiple: {
        type: Boolean,
        required: false,
    },
});

FilterSchema.method('toJSON', function() {
    const {_v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
});

export default model('Filter', FilterSchema);