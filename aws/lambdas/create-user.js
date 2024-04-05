const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const requestBody = JSON.parse(event.body);
    const email = requestBody.email;
    const currency = requestBody.currency;

    const params = {
        TableName: 'Users',
        Item: {
            email: email,
            currency: currency
        }
    };

    try {
        await dynamoDb.put(params).promise();
        return { statusCode: 200, body: JSON.stringify({ message: 'Usuário criado com sucesso' }) };
    } catch (error) {
        console.error(error);
        return { statusCode: 500, body: JSON.stringify({ message: 'Erro ao criar usuário' }) };
    }
};
