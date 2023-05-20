export default function isImage(ext: string) {
    const imageExt = ['jpeg', 'webp', 'jpg', 'png', 'svg']
    return imageExt.includes(ext)
}
