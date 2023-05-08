import axios, {AxiosResponse} from 'axios';
const https = require('https');

export async function axiosReq(options: AxiosConfig) {
  try {
    const headers = {
      Authorization: `Bearer ${options.bearerToken}`,
    };

    const data = await axios({
      url: options.url,
      method: options.method,
      data: options.data,
      headers: headers,
    });
    return data;
  } catch (e: any) {
    console.log(e);
    throw new Error(e);
  }
}
