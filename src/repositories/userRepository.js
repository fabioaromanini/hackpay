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
