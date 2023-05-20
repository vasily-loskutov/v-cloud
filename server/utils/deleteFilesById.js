const fs = require('fs');
const File = require('../models/file')

module.exports = async function (ids) {
    for (let fileId of ids) {
        const file = await File.findOne({ where: { id: fileId } })
        fs.unlink(`./static/${file.name}`, (err) => {
            if (err) throw err;
            console.log('Файл удален');
        });
    }

}
