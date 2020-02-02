/* eslint-disable no-console */
import config from '../config';
import StorageHelper from './StorageHelper';


const excludedRequest = ['auth/login', 'users/register'];
const storageHelper = new StorageHelper();

export default class ApiRequests {
  login = async (userName, password) => {
    const loginPostData = {
      userName,
      password
    };

    const loginResponse = await this.PostApiCall('auth/login', loginPostData);
    if (loginResponse && loginResponse.status === 'ok') {
      try {
        const jwtString = JSON.stringify(loginResponse.jwt);
        await storageHelper.storeJwt(jwtString);
      } catch (error) {
        console.error(error);
      }
    }
    return loginResponse;
  }

  register = async (firstName, lastName, userName, password) => {
    const registerPostData = {
      firstName,
      lastName,
      userName,
      password
    };

    return this.PostApiCall('users/register', registerPostData);
  }

  getUsers = async () => {
    const usersResponse = await this.PostApiCall('users', {});
    return usersResponse;
  }

  PostApiCall = async (requestName, postData) => {
    const data = {
      method: 'POST',
      // credentials: 'same-origin',
      // mode: 'same-origin',
      body: JSON.stringify(postData),
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        //   'X-CSRFToken':  cookie.load('csrftoken')
      }
    };

    if (!excludedRequest.includes(requestName)) {
      const jwt = await storageHelper.getJwtFromStore();
      data.headers.Authorization = `Bearer ${jwt}`;
    }

    try {
      // const res = await fetch(`http://10.100.102.5:4000/${requestName}`, data);
      const baseUrl = (config.API_URL_DEBUG) ? config.API_URL_DEBUG : config.API_URL_EMULATOR;
      // console.log(`base url: ${baseUrl} and ${config.API_URL_DEBUG}`);
      const res = await fetch(`${baseUrl}/${requestName}`, data);
      const responseData = await res.json();
      return responseData;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
