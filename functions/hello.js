"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const handler = async function (event, context) {
    console.log(event, context);
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 401,
            body: 'POST OR BUST!'
        };
    }
    const { identity, user } = context.clientContext;
    if (!identity) {
        return {
            statusCode: 401,
            body: "Must have identity"
        };
    }
    return {
        statusCode: 200,
        body: "Hello, Shapansky-Patels"
    };
};
exports.handler = handler;
