const Article = require("../models/Article");

const articleMock = require("../mock/articles.json");

module.exports = async () => {
    const articles = await Article.find();
    if (articles.length !== articleMock.length) {
        createInitialEntity(Article, articleMock);
    }

    async function createInitialEntity(Model, data) {
        await Model.collection.drop();
        return Promise.all(
            data.map(async (item) => {
                try {
                    delete item._id;
                    const newItem = new Model(item);
                    await newItem.save();
                    return newItem;
                } catch (e) {
                    return e;
                }
            })
        );
    }
};
