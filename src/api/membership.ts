import axios from 'axios';
import base64 from 'base-64';
import utf8 from 'utf8';
import Cookies from 'js-cookie';

export interface Tokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
}

export const getTokens = async (username: string, password: string): Promise<Tokens> => {
  //
  let text = utf8.encode(`${username}:${password}`);
  let ecodedRes = base64.encode(text);

  const res = await axios({
    url: '/api/authorization/token',
    params: { strategy: 'userCredentials' },
    headers: { Authorization: `Basic ${ecodedRes}` },
  });

  return res.data;
};

export interface DataFromTokensCall {
  data: {
    accessToken: string;
    refreshToken: string;
    expiresAt: string;
  };
  status: number;
}

export const getNewTokensByRefreshToken = (): Promise<DataFromTokensCall> => {
  return axios({
    method: 'GET',
    url: '/api/authorization/token?strategy=refreshToken',
    headers: { Authorization: `Bearer ${Cookies.get('refreshToken')}` },
  });
};
// export const getTokens = async (username: string, password: string): Promise<Tokens> => {
//   //
//   let text = utf8.encode(`${username}:${password}`);
//   let ecodedRes = base64.encode(text);

//   const res = await axios({
//     url: 'http://localhost:8000/authorization/token',
//     params: { strategy: 'userCredentials' },
//     headers: { Authorization: `Basic ${ecodedRes}` },
//   });

//   return res.data;
// };

// export interface DataFromTokensCall {
//   data: {
//     accessToken: string;
//     refreshToken: string;
//     expiresAt: string;
//   };
//   status: number;
// }

// export const getNewTokensByRefreshToken = (): Promise<DataFromTokensCall> => {
//   return axios({
//     method: 'GET',
//     url: 'http://localhost:8000/authorization/token?strategy=refreshToken',
//     headers: { Authorization: `Bearer ${Cookies.get('refreshToken')}` },
//   });
// };
