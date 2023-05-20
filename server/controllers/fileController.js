const fileService = require("../services/fileService");
const File = require('../models/file')
const fs = require('fs')
class fileContoller {
    async saveFile(req, res, next) {
        try {


            const { userId } = req.params
            console.log(userId)
            
            const file = await fileService.saveFile(req.files.file, userId);

            return res.json(file);
        } catch (e) {
            next(e);
        }
    }
    async emptyTrash(req, res, next) {
        try {


            const { userId } = req.params
            const { fileNames } = req.body

            const response = await fileService.emptyTrash(fileNames, userId);

            return res.json(response);
        } catch (e) {
            next(e);
        }
    }
    async downloadFile(req, res, next) {

        try {

            const file = await File.findOne({ where: { id: req.params.id } })

            const path = 'static' + '\\' + file.name;
            console.log(fs.existsSync(path))
            if (fs.existsSync(path)) {
                return res.download(path, file.name)
            }
            return res.status(400).json({ message: 'Download error' })
        } catch (e) {
            next(e)
        }

    }
    async getUserFiles(req, res, next) {

        try {
            const { userId } = req.params
            const response = await fileService.getUserFiles(userId)

            return res.send(response)
        } catch (e) {
            next(e)
        }

    }
    async getDeleteUserFiles(req, res, next) {

        try {
            const { userId } = req.params
            const response = await fileService.getDeleteUserFiles(userId)

            return res.send(response)
        } catch (e) {
            next(e)
        }

    }


}
module.exports = new fileContoller();
