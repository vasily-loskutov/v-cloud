interface IDataError {
    message: string
}

export interface IError {
    data: IDataError
    status: number
}
