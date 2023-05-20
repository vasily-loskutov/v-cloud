export default function isDoc(ext: string) {
    const imageExt = ['doc', 'txt', 'docx', 'ppt', 'pptx', 'dot', 'pdf']
    return imageExt.includes(ext)
}
