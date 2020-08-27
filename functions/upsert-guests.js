const faunadb = require('faunadb')
const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET
});
const q = faunadb.query

function multiUpsert(guests) {
    return q.Map(
        guests,
        q.Lambda(
            ['guest'],
            q.If(q.Exists(q.Match(q.Index('name'), q.Select(['data', 'name'], q.Var('guest')))),
                q.Replace(q.Select('ref', q.Get(q.Match(q.Index('name'), q.Select(['data', 'name'], q.Var('guest'))))), q.Var('guest')),
                q.Create(q.Collection('guests'), q.Var('guest'))
            )
        )
    );
}

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 500, body: 'POST OR BUST!' }
    }

    const guests = JSON.parse(event.body);

    console.log(`Function 'upsert-guests' invoked for ${guests.length} guests`);

    try {
        let query = await client.query(multiUpsert(guests));

        return {
            statusCode: 200,
            body: query
        };
    } catch (error) {
        return {
            statusCode: 400,
            body: error
        };
    }
}