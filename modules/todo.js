const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let schema = new Schema({
    text: {
        type: String,
        required: true,
t:{
type:String,
required:true,
}
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports =mongoose.model("do", schema);
