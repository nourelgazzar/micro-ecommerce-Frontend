import axios from 'axios';

const GenericAPI = {
  async getData(url, token) {
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    };
    const req = axios.get(url, headers);
    return req;
  },

  async postData(url, body, token) {
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    };
    const req = axios.post(url, headers, body);
    return req;
  },

  async putData(url, body, token) {
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    };

    const req = axios.put(url, headers, body);
    return req;
  },

  async deleteData(url, body, token) {
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    };

    const req = axios.delete(url, headers, body);
    return req;
  },
};

export default GenericAPI;
