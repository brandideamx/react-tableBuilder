const axios = require('axios');

const url = 'http://localhost:8000/api';

export default {
  postRequest: async (path, params) => {
    try  {
      const res = await axios.post(url+path, params);
      return res.data;
    } catch (err) {
      return console.log(err);
    }
  },
  getRequest: async (path) => {
    try  {
      const res = await axios.get(url+path);
      return res.data;
    } catch (err) {
      return console.log(err);
    }
  },
  authGetRequest: async (path, headers = {}) => {
    try  {
      const res = await axios.get(url+path, { headers: headers });
      return res.data;
    } catch (err) {
      return console.log(err);
    }
  },
  authPostRequest: async (path, params, headers) => {
    try  {
      const res = await axios.post(url+path, params, { headers: headers });
      return res.data;
    } catch (err) {
      return console.log(err);
    }
  },
}