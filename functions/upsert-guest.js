const faunadb = require('faunadb')
const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET
});
const q = faunadb.query

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 500, body: 'POST OR BUST!' }
    }

    const { identity, user } = context.clientContext;

    console.log(identity, user);

    const data = JSON.parse(event.body);

    const name = data.name;

    console.log(`Function 'upsert-guest' invoked for ${name}`);

    let query = await client.query(q.Get(
        q.Match(q.Index('name'), name)
    ));

    console.log(query);

    return {
        statusCode: 200,
        body: 'beep'
    };

    return client.query(q.Update(q.Ref(`classes/todos/${id}`), { data }))
        .then((response) => {
            console.log('success', response)
            return {
                statusCode: 200,
                body: JSON.stringify(response)
            }
        }).catch((error) => {
            console.log('error', error)
            return {
                statusCode: 400,
                body: JSON.stringify(error)
            }
        })
}