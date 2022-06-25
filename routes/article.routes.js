const express = require("express");
const Article = require("../models/Article");
const auth = require("../middleware/auth.middleware");
const router = express.Router({mergeParams: true});

router
    .route("/")
    .get(async (req, res) => {
        try {
            const list = await Article.find();
            res.send(list);
        } catch (e) {
            res.status(500).json({
                message: "На сервере произошла ошибка. Попробуйте позже.",
            });
        }
    })
    .post(auth, async (req, res) => {
         console.log(req.files);
        try {
            const newArticle = await Article.create({
                ...req.body,
                // userId: req.user._id,
            });

            res.status(201).send(newArticle);
        } catch (e) {
            res.status(500).json({
                message: "На сервере произошла ошибка. Попробуйте позже.",
            });
        }
    });

router
    .route("/:articleId")
    .patch(async (req, res) => {
        try {
            const {articleId} = req.params;
            console.log(articleId)

            if (articleId) {
                const updatedArticle = await Article.findByIdAndUpdate(articleId, req.body, {new: true});
                res.send(updatedArticle);
            } else {
                res.status(401).json({message: "Unauthorized"});
            }
        } catch (e) {
            res.status(500).json({
                message: "На сервере произошла ошибка. Попробуйте позже.",
            });
        }
    })
    .delete(async (req, res) => {
        try {
            const {articleId} = req.params;
            const removedArticle = await Article.findById(articleId);
            await removedArticle.remove();
            return res.send(null);
        } catch (e) {
            res.status(500).json({
                message: "На сервере произошла ошибка. Попробуйте позже.",
            });
        }
    });

module.exports = router;
