const cropFileName = (fileName: string) => {
    if (fileName.length >= 10) {
        return `${fileName.split('').slice(0, 2).join('')}...${fileName.split('').slice(-9, fileName.length).join('')}`
    } else {
        return fileName
    }
}


export default cropFileName
