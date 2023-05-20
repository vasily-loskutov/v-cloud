import { IFile } from "@/models";
import { isImage } from ".";
import isDoc from "./isDoc";
import isVideo from "./isVideo";
export default function (data: IFile[], sortedExt?: string): IFile[] {
    let newData: IFile[] = []
    switch (sortedExt) {
        case 'photos':
            newData = data?.filter((file: IFile) => {
                return isImage(file.ext || '')

            })
            break
        case 'documents':
            newData = data?.filter((file: IFile) => {
                return isDoc(file.ext || '')

            })
            break
        case 'video':
            newData = data?.filter((file: IFile) => {
                return isVideo(file.ext || '')

            })
            break
        default: {
            newData = data
        }

    }
    return newData
}
