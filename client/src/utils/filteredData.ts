import { IFile } from "@/models";
import * as _ from "lodash"
export function filteredData(data: IFile[], parameters: 'new' | 'old' | 'heavyweight' | 'ligthweight'): IFile[] {
    let newData: IFile[] = []
    switch (parameters) {
        case ('new'):
            newData = data?.slice(0, data.length).reverse()
            break
        case ('old'):
            newData = data
            break
        case ('heavyweight'):
            newData = _.orderBy(data, ['size'], 'desc')
            break
        case ('ligthweight'):
            newData = _.orderBy(data, ['size'], 'asc')
            break
    }
    return newData
}   
