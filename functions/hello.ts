import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const handler = async function (event: APIGatewayProxyEvent, context: any): Promise<APIGatewayProxyResult> {
    console.log(event, context);

    if (event.httpMethod !== 'POST') {
        return { 
            statusCode: 401, 
            body: 'POST OR BUST!' 
        }
    }

    const { identity, user } = context.clientContext;

    if (!identity) {
        return {
            statusCode: 401,
            body: "Must have identity"
        }
    }

    return {
        statusCode: 200,
        body: "Hello, Shapansky-Patels"
    };
};