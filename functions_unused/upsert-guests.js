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
            q.If(q.Exists(q.Match(q.Index('name'), q.Select('name', q.Var('guest')))),
                q.Replace(q.Select('ref', q.Get(q.Match(q.Index('name'), q.Select('name', q.Var('guest'))))), { data: q.Var('guest') }),
                q.Create(q.Collection('guests'), { data: q.Var('guest') } )
            )
        )
    );
}

function upsert(guest) {
    return q.If(
        q.Exists(q.Match(q.Index('name'), guest.name)),
        q.Replace(
            q.Select('ref', q.Get(q.Match(q.Index('name'), guest.name))),
            {
                guest
            }
        ),
        q.Create(q.Collection('guests'), {
            data: guest
        })
    )
}

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 500, body: 'POST OR BUST!' }
    }

    const guests = JSON.parse(event.body);

    console.log(`Function 'upsert-guests' invoked for ${guests.length} guests`);

    try {
        const query = await client.query(multiUpsert(guests));
        // console.log(query);

        return {
            statusCode: 200,
            body: ''
        };
    } catch (error) {
        return {
            statusCode: 400,
            body: error
        };
    }
}