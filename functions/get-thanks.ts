import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import * as faunadb from 'faunadb';

const client = new faunadb.Client({
    secret: process?.env?.FAUNADB_SERVER_SECRET ?? ""
});

const q = faunadb.query;

export const handler = async function (event: APIGatewayProxyEvent, context: any): Promise<APIGatewayProxyResult> {
    // console.log(event, context);

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
            body: "Must have user"
        }
    }

    const emailInfo = JSON.parse(event.body ?? "{}");

    let query: any;
    try {
        query = await client.query(
            q.Get(
                q.Match(q.Index("thanks_email"), emailInfo.email)
            )
        );   
    } catch (error) {
        return {
            statusCode: 500,
            body: `Error getting message: ${error}`
        };
    }

    if (!query.data) {
        return {
            statusCode: 500,
            body: `Couldn't get message: ${JSON.stringify(query)}`
        };
    }

    console.log(query);

    return {
        statusCode: 200,
        body: JSON.stringify(query.data)
    };
};