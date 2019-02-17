const axios = require('axios');

const { API_PUBLISHABLE_KEY, MARKETPLACE_ID, API_GW_URL_BASE } = process.env;

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
  };
  try {
    const response = await axios.post(url, data, {
      headers: headers,
      auth: auth,
    });
    return response.data.id;
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
  ownerID,
  receiverID
) => {
  const url = `${API_GW_URL_BASE}/v2/marketplaces/${MARKETPLACE_ID}/transfers/${ownerID}/to/${receiverID}`;

  const data = {
    amount,
    description,
  };
  try {
    const response = await axios.post(url, data, {
      headers: headers,
      auth: auth,
    });
    return response.data;
  } catch (e) {
    console.log(e.response.data);
    throw e;
  }
};

module.exports.getBalance = async id => {
  const url = `${API_GW_URL_BASE}/v1/marketplaces/${MARKETPLACE_ID}/buyers/${id}/balances`;
  try {
    const response = await axios.get(url, { headers: headers, auth: auth });
    return response.data;
  } catch (e) {
    throw e;
  }
};

module.exports.tokenizeCard = async () => {
  const url = `${API_GW_URL_BASE}/v1/marketplaces/${MARKETPLACE_ID}/cards/tokens`;

  const data = {
    holder_name: 'MOVILEHACK WINNER CREDIT CARD',
    expiration_month: '09',
    expiration_year: '2020',
    security_code: '654',
    card_number: '4539003370725497',
  };

  try {
    const response = await axios.post(url, data, {
      headers: headers,
      auth: auth,
    });
    return response.data.id;
  } catch (e) {
    throw e;
  }
};
