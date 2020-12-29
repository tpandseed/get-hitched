const faunadb = require('faunadb');
const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET
});
const q = faunadb.query;

const stringify = require('csv-stringify/lib/sync');

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 500, body: 'POST OR BUST!' }
    }

    console.log(`Function 'get-guests' invoked`);

    try {
        let query = await client.query(
            q.Paginate(q.Match(q.Index('all_guests')))
        );

        let getAllQuery = query.data.map(ref => q.Get(ref));

        let allData = await client.query(getAllQuery);

        let justData = allData.map(d => d.data);

        let csvStr = stringify(justData, { header: true });

        return {
            statusCode: 200,
            body: csvStr,
            // headers: {
            //     'Content-type': 'text/plain',
            //     'Content-Disposition': 'attachment; filename="guests.csv"; filename*="guests.csv"'
            // }
        };
    } catch (error) {
        return {
            statusCode: 400,
            body: error.toString()
        };
    }
}