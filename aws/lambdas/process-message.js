const AWS = require('aws-sdk');
const eventBridge = new AWS.EventBridge();

exports.handler = async (event) => {
    for (const record of event.Records) {
        const messageBody = JSON.parse(record.body);

        const eventParams = {
            Entries: [
                {
                    Source: "my.sqs.function",
                    DetailType: "SQSMessageReceived",
                    Detail: JSON.stringify(messageBody),
                    EventBusName: "default",
                },
            ],
        };

        try {
            await eventBridge.putEvents(eventParams).promise();
            console.log("Evento enviado ao EventBridge:", messageBody);
        } catch (error) {
            console.error("Erro ao enviar evento ao EventBridge:", error);
            throw error;
        }
    }
};
