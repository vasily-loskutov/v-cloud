const fs = require('fs');


module.exports = function (fileNames) {
    for (let fileName of fileNames) {
        fs.unlink(`./static/${fileName}`, (err) => {
            if (err) throw err;
            console.log('Файл удален');
        });
    }

}
