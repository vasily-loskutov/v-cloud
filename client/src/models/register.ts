import { ILogInPayload } from "./logIn";

export interface IRegisterPayload extends ILogInPayload {
    name: string
}
