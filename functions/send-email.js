const nodemailer = require('nodemailer');

exports.handler = async function (event, context) {
    let transporter = nodemailer.createTransport({
        host: 'smtp.fastmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'login',
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const emailInfo = JSON.parse(event.body);

    // let works = await transporter.verify();
    // console.log('works', works);

    try {
        const send = await transporter.sendMail({
            from: {
                name: 'Syd & Tirth',
                address: 'wedding@sydandtirth.life'
            },
            to: emailInfo.email,
            subject: 'Thank you for RSVPing to our nuptials!',
            text: `Hi ${emailInfo.name},

*We can't wait for you to join us for our special day!*

*Where: *Compass Rose Suites, 575 Crowes Rd, Milford ON K0K2P0
*When: *Tuesday September 15, 2020 Ceremony begins at 4:30pm, Dinner at 6pm
*Who: *We expect a perfect crowd of 35 of our closest friends and family to
join us

*COVID HOUSEKEEPING:*
We want our special day to be enjoyable and relaxing for everyone involved
but we also do not want to forget that we are living in uncertain times and
getting married during a pandemic.

While we hope the weather will be on our side and it will be possible for
our ceremony and mingling/diner afterwards to take place entirely outdoors,
we need to prepare for the possibility of rain and ensure the safety of the
service staff in close quarters, for that reason we ask everyone to bring a
mask for use when entering indoor spaces (bathroom, food/drink service
areas, the greenhouse, the barn).

We understand that everyone needs to make safe and practical decisions for
themselves right now and want to express how much we still love you and
understand if you can't make it or your plans change for any reason, at any
time. We also respectfully ask that you help protect our other loved ones
by staying home if you feel sick and ask that you practice healthy physical
distancing leading up to and during the event.

We wish we could hug and high-five each and every one of you on our special
day but we're sure you understand why we'll be restricting physical contact
to our own social bubble and hope you will do the same.

*We heartily request all of our guests to consider getting a COVID-19 test
in the week leading up to our wedding for everyone's peace of mind. *

We are beyond excited with how beautifully and quickly so many of you have
helped us put this together and can't wait to see you all soon,

Sydney + Tirth`,
            html: `Hi ${emailInfo.name},

<b>We can't wait for you to join us for our special day!</b>

<b>Where:</b> Compass Rose Suites, 575 Crowes Rd, Milford ON K0K2P0
<b>When:</b> Tuesday September 15, 2020 Ceremony begins at 4:30pm, Dinner at 6pm
<b>Who:</b> We expect a perfect crowd of 35 of our closest friends and family to
join us

<b><u>COVID HOUSEKEEPING:</u></b>
We want our special day to be enjoyable and relaxing for everyone involved
but we also do not want to forget that we are living in uncertain times and
getting married during a pandemic.

While we hope the weather will be on our side and it will be possible for
our ceremony and mingling/diner afterwards to take place entirely outdoors,
we need to prepare for the possibility of rain and ensure the safety of the
service staff in close quarters, for that reason we ask everyone to bring a
mask for use when entering indoor spaces (bathroom, food/drink service
areas, the greenhouse, the barn).

We understand that everyone needs to make safe and practical decisions for
themselves right now and want to express how much we still love you and
understand if you can't make it or your plans change for any reason, at any
time. We also respectfully ask that you help protect our other loved ones
by staying home if you feel sick and ask that you practice healthy physical
distancing leading up to and during the event.

We wish we could hug and high-five each and every one of you on our special
day but we're sure you understand why we'll be restricting physical contact
to our own social bubble and hope you will do the same.

<b>We heartily request all of our guests to consider getting a COVID-19 test
in the week leading up to our wedding for everyone's peace of mind.</b>

We are beyond excited with how beautifully and quickly so many of you have
helped us put this together and can't wait to see you all soon,

Sydney + Tirth`
        });

        console.log(send);

        return {
            statusCode: 200,
            body: "Ok"
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: error.toString()
        }
    }
}