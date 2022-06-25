const multer  = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
const config = require('config');
const mongoose = require("mongoose");
const connection = mongoose.connect(config.get("mongoUri"));

const types = ['image/png', 'image/jpeg', 'image/jpg']

const storage = new GridFsStorage({
    db: connection,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        if(types.includes(file.mimetype)){
            return {
                bucketName: "images",
                fileName: new Date().toISOString() +'-' + file.originalname
            }
        }

    },
    cache: 'connections'
});

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         // передаем путь куда сохранить файл
//         cb(null, '/images')
//     },
//     filename: function (req, file, cb) {
//         cb(null, new Date().toISOString() +'-' + file.originalname)
//     }
// })

// function fileFilter (req, file, cb) {
//     if(types.includes(file.mimetype)){
//         cb(null, true)
//     } else {
//         cb(null, false)
//     }
//
//     // Вы можете всегда вернуть ошибку, если что-то пошло не так:
//     cb(new Error('I don\'t have a clue!'))
//
// }


module.exports = multer({storage, limits: {
        fieldSize: 1024 * 1024 * 3,
    }})