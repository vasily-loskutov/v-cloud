module.exports = function (files, fileList) {

    const newArr = []
    for (let file of fileList) {
        if (!files.includes(file)) {
            newArr.push(file)
        }
    }
    return newArr
}

