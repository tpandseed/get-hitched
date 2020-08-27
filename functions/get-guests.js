const faunadb = require('faunadb')
const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET
});
const q = faunadb.query

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 500, body: 'POST OR BUST!' }
    }

    console.log(`Function 'get-guests' invoked`);

    try {
        let query = client.query(
            q.Paginate(q.Match(q.Index('names')))
          );

        console.log(query);

        return {
            statusCode: 200,
            body: 'hey'
        };
    } catch (error) {
        return {
            statusCode: 400,
            body: error
        };
    }
}