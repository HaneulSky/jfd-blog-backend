const {Schema, model} = require("mongoose");

const schema = new Schema(
    {
        content: {type: String, required: true},
        // На чьей странице находится комментарий
        articleId: {type: Schema.Types.ObjectId, ref: "Article", required: true},
        // Тот, кто оставил комментарий
        userId: {type: Schema.Types.ObjectId, ref: "User", required: true},
    },
    {
        timestamps: {createdAt: "created_at"},
    }
);

module.exports = model("Comment", schema);
