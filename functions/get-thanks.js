"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const faunadb = __importStar(require("faunadb"));
const client = new faunadb.Client({
    secret: (_b = (_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.FAUNADB_SERVER_SECRET) !== null && _b !== void 0 ? _b : ""
});
const q = faunadb.query;
const handler = async function (event, context) {
    // console.log(event, context);
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
            body: "Must have user"
        };
    }
    let query = await client.query(q.Get(q.Match(q.Index("thanks_people"), "Tirth")));
    if (!query.data) {
        return {
            statusCode: 500,
            body: `Couldn't get message: ${JSON.stringify(query)}`
        };
    }
    console.log(query);
    return {
        statusCode: 200,
        body: query.data.message
    };
};
exports.handler = handler;
