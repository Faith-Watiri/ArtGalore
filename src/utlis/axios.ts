import axios, { AxiosResponse } from 'axios'
const https = require('https')

export async function axiosReq(options: AxiosConfig) {
    try {
        const data = await axios({
            url: options.url,
            method: options.method,
            data: options.data,
        })
        return data;
    } catch (e: any) {
        console.log(e);
        throw new Error(e)
    }
}