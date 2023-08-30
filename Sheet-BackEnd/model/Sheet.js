const mongoose = require('mongoose');
const {Schema} = mongoose;

const SheetSchema = new Schema({
    cell_A:{
        type: String,
    },
    cell_B:{
        type: String,
    },
    cell_C:{
        type: String,
    },
    cell_D:{
        type: String,
    },
    cell_E:{
        type: String,
    },
    date:{
        type: Date,
        default: Date.now
    },
});

const Sheet = mongoose.model('sheet',SheetSchema);
// User.createIndexes();
module.exports = Sheet;