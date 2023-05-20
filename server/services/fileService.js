const User = require("../models/user")
const uuid = require('uuid')
const path = require("path")
const deleteFileByNames = require("../utils/deleteFile")
const File = require('../models/file')
const getExtFile = require("../utils/getExtFile")
const fs = require('fs')
const ApiError = require("../exceptions/apiError")
class FileService {
    async saveFile(file, id) {

        const fileName = uuid.v4() + file.name;
        const user = await User.findOne({ where: { id } })

        if (file.size + user.allFilesSize >= user.totalSize) {
            throw ApiError.BadRequest('свободное место на диске закончилось')
        }

        const newFile = await File.create({
            name: fileName,
            ext: getExtFile(fileName),
            size: file.size
        })

        user.files.push(newFile.id);
        await User.update({
            files: user.files,
            allFilesSize: +user.allFilesSize + file.size
        }, { where: { id } })

        const filePath = path.resolve('static', fileName);
        file.mv(filePath);
        return fileName



    }
    async emptyTrash(fileNames, id) {
        try {

            const user = await User.findOne({ where: { id } })
            let emptySize = 0

            for (let fileName of fileNames) {
                const file = await File.findOne({ where: { name: fileName } })
                emptySize += file.size
            }
            console.log(emptySize)
            deleteFileByNames(fileNames)
            await user.update({
                deleteFiles: [],
                allFilesSize: +user.allFilesSize - emptySize
            }, { where: { id } })
            console.log(user)
            return user

        } catch (error) {
            console.log(error)
        }

    }
    async downloadFile(filename) {

        try {

            const file = await File.findOne({ where: { name: filename } })
            console.log(file)
            const path = 'static' + '\\' + file.name;

            if (fs.existsSync(path)) {
                return { file: file.name, path }
            }
        } catch (error) {
            throw ApiError.BadRequest("Файл не был найден");
        }

    }
    async getUserFiles(userId) {

        try {
            console.log(userId)
            const user = await User.findOne({ where: { id: userId } });

            const files = []
            for (let fileId of user.files) {
                const file = await File.findOne({ where: { id: fileId } });
                files.push(file)
            }

            return files
        } catch (error) {
            throw ApiError.BadRequest('неизвестная ошибка');
        }

    }
    async getDeleteUserFiles(userId) {

        try {
            console.log(userId)
            const user = await User.findOne({ where: { id: userId } });

            const files = []
            for (let fileId of user.deleteFiles) {
                const file = await File.findOne({ where: { id: fileId } });
                files.push(file)
            }

            return files
        } catch (error) {
            throw ApiError.BadRequest('неизвестная ошибка');
        }

    }


}
module.exports = new FileService();
