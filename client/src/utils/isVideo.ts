export default function isVideo(ext: string) {
    const imageExt = ['mp4', 'mpeg-4', 'avi', 'mp2', 'wmv']
    return imageExt.includes(ext)
}
