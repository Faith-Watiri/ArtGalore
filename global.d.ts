import {Method} from 'axios';
export {};

declare global {
  type AxiosConfig = {
    bearerToken: any;
    url: string;
    method: Method;
    data: object;
  };
}
