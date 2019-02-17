var axios = require('axios');

const API_PUBLISHABLE_KEY = 'zpk_test_ogmi3TJnV33UDljdN4n8aRit';
const MARKETPLACE_ID = '3249465a7753536b62545a6a684b0000';
const API_GW_URL_BASE = 'https://api.zoop.ws';

const headers = {
  'Content-Type': 'application/json',
};

const auth = {
  username: API_PUBLISHABLE_KEY,
  password: '',
};

module.exports.createUser = async (
  firstName,
  lastName,
  taxpayer_id,
  phone,
  email
) => {
  const url = `${API_GW_URL_BASE}/v1/marketplaces/${MARKETPLACE_ID}/buyers`;

  const data = {
    first_name: firstName,
    last_name: lastName,
    taxpayer_id,
    phone_number: phone,
    email,
  };
  try {
    const response = await axios.post(url, data, {
      headers: headers,
      auth: auth,
    });
    return response.data;
  } catch (e) {
    throw e;
  }
};

module.exports.cardAssociate = async (customer, token) => {
  const url = `${API_GW_URL_BASE}/v1/marketplaces/${MARKETPLACE_ID}/cards`;

  const data = {
    customer,
    token,
  };

  try {
    const response = await axios.post(url, data, {
      headers: headers,
      auth: auth,
    });
    return response.data;
  } catch (e) {
    throw e;
  }
};

module.exports.preAuthCreditCard = async (
  amount,
  description,
  on_behalf_of,
  customer
) => {
  const url = `${API_GW_URL_BASE}/v1/marketplaces/${MARKETPLACE_ID}/transactions`;

  const data = {
    amount,
    currency: 'BRL',
    description,
    on_behalf_of,
    customer,
    payment_type: 'credit',
    capture: 'false',
  };
  try {
    const response = await axios.post(url, data, {
      headers: headers,
      auth: auth,
    });
    return response.data;
  } catch (e) {
    throw e;
  }
};

module.exports.paymentCapture = async (amount, transactionID, on_behalf_of) => {
  const url = `${API_GW_URL_BASE}/v1/marketplaces/${MARKETPLACE_ID}/transactions/${transactionID}/capture`;

  const data = {
    amount,
    on_behalf_of,
  };

  try {
    const response = await axios.post(url, data, {
      headers: headers,
      auth: auth,
    });
    return response.data;
  } catch (e) {
    throw e;
  }
};

module.exports.transactionP2P = async (
  amount,
  description,
  transfer_date,
  ownerID,
  receiverID
) => {
  const url = `${API_GW_URL_BASE}/v2/marketplaces/${MARKETPLACE_ID}/transfers/${ownerID}/to/${receiverID}`;

  const data = {
    amount,
    description,
    transfer_date,
  };
  try {
    const response = await axios.post(url, data, {
      headers: headers,
      auth: auth,
    });
    return response.data;
  } catch (e) {
    throw e;
  }
};

module.exports.getBalance = async (resource, id) => {
  const url = `${API_GW_URL_BASE}/v1/marketplaces/${MARKETPLACE_ID}/${resource}/${id}/balances`;
  try {
    const response = await axios.get(url, { headers: headers, auth: auth });
    return response.data;
  } catch (e) {
    throw e;
  }
};
