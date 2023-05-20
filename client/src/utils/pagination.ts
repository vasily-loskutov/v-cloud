import { IFile } from "@/models";

export function pagination(pageSize: number, currentPage: number, data: IFile[]) {
    const startIndex = (currentPage - 1) * pageSize;
    return [...data].splice(startIndex, pageSize);
}
