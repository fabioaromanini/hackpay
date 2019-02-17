const axios = require('axios');

const { WAVY_ACCESS_KEY } = process.env;

const headers = {
  'Content-type': 'application/json',
  'Access-key': WAVY_ACCESS_KEY,
};

const { WAVY_URL: url } = process.env;

module.exports.sendNotification = async (phoneNumber, message) => {
  const options = {
    headers,
    data: {
      to: phoneNumber,
      message,
    },
    url,
    method: 'POST',
  };

  const { data } = await axios(options);
  return data;
};
