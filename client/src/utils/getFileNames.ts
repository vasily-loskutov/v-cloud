import { IFile } from "@/models";

export function getFileNames(files: IFile[]): string[] {
    return files.reduce((acc: string[], file: IFile) => { return [...acc, file.name] }, [])

}
