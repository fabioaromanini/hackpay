const AWS = require('aws-sdk');

const { USERS_TABLE: TableName, REGION } = process.env;

const dynamoDb = new AWS.DynamoDB.DocumentClient({ region: REGION });

module.exports.getUser = phoneNumber =>
  dynamoDb
    .get({
      TableName,
      Key: { phoneNumber },
    })
    .promise();

const tokenUpdateExpression =
  'SET #loginToken = :loginToken, updatedAt = :updatedAt';
module.exports.updateToken = (phoneNumber, token) =>
  dynamoDb
    .update({
      TableName,
      Key: {
        phoneNumber,
      },
      UpdateExpression: tokenUpdateExpression,
      ExpressionAttributeNames: {
        '#loginToken': 'token',
      },
      ExpressionAttributeValues: {
        ':loginToken': token,
        ':updatedAt': new Date().toISOString(),
      },
    })
    .promise();

module.exports.persistUser = user =>
  dynamoDb.put({
    TableName,
    Item: user,
  });
