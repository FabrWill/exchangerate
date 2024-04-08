const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-1' });

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

exports.handler = async (event, context) => {
    try {
        const tableName = process.env.TABLE_NAME;

        if (!event.pathParameters || !event.pathParameters.id) {
            return { statusCode: 400, body: 'id is required' };
        }
        const id = event.pathParameters.id;

        const body = JSON.parse(event.body || '{}');

        const params = {
            TableName: tableName,
            Item: {
                id: id,
                payload: body
            }
        };

        await dynamoDB.put(params).promise();

        const sqsParams = {
            MessageBody: JSON.stringify({ userId: id }),
            QueueUrl: process.env.QUEUE_URL
        }
        
        await sqs.sendMessage(sqsParams).promise();
        

        return { statusCode: 200, body: JSON.stringify({ message: 'item saved' }) };
    } catch (error) {
        console.error('Error:', error);
        return { statusCode: 500, body: JSON.stringify({ error: 'internal error' }) };
    }
};
