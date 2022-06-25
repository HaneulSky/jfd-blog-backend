const {Schema, model} = require("mongoose");

const schema = new Schema({
        title: {
                type: String,
                required: true
        },
        files: [Object]
}, {timestamps: true});

module.exports = model("Images", schema);