import { Method } from "axios";
export { }

declare global {
    type AxiosConfig = {
        url: string,
        method: Method,
        data: object,
    }
}