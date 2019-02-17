const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.USERS_TABLE;

module.exports.listUsers = () => dynamoDb.scan({
    TableName: USERS_TABLE,
}).promise();
