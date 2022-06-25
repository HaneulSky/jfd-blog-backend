const express = require("express");
const User = require("../models/User");
const router = express.Router({mergeParams: true});
const auth = require("../middleware/auth.middleware");

router.get("/:userId", auth, async (req, res) => {
    try {
        const list = await User.find();
        res.send(list);
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже.",
        });
    }
});
router.get("/", async (req, res) => {
    try {
        const list = await User.find();
        res.send(list);
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже.",
        });
    }
});

module.exports = router;
