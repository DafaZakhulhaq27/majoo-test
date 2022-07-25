const axios = require("axios");

export default axios.create({
  baseURL: 'https://virtserver.swaggerhub.com/hanabyan',
  timeout: 10000,
});
