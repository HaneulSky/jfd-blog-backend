const {Schema, model} = require("mongoose");

const schema = new Schema(
    {
        content: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        urlImage: {
            type: String
        },
        link: {
            type: String,
        },
        userId: {type: String, required: true},
    },
    {
        timestamps: {createdAt: "created_at"},
    }
);

module.exports = model("Article", schema);
