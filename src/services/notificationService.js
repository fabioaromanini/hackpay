const notificationRepository = require('../repositories/notificationRepository');

module.exports.sendTokenNotification = async (phoneNumber, token) => {
  const message = `Olá! Seu token é ${token}`;
  await notificationRepository.sendNotification(phoneNumber, message);
};
