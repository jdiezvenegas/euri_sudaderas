// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

export const config = {
    api: {
        bodyParser: false,
    },
}

// Sacado de https://github.com/vercel/next.js/discussions/13405#discussioncomment-405300
const webhookPayloadParser = (req) =>
    new Promise((resolve) => {
        let data = "";
        req.on("data", (chunk) => {
            data += chunk;
        });
        req.on("end", () => {
            resolve(Buffer.from(data).toString());
        });
    });

const fulfillOrder = (session) => {
    // TODO: fill me in
    console.log("Fulfilling order", session);
}

export default async function handler(req, res) {
    if (req.method === "POST") {
        const payload = await webhookPayloadParser(req);
        const sig = req.headers['stripe-signature'];

        let event;

        try {
            event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
        } catch (err) {
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }

        // Handle the checkout.session.completed event
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;

            // console.log(stripe.checkout.sessions.listLineItems(
            //     session.id,
            //     // { limit: 5 },
            //     // function(err, lineItems) {
            //     //     // asynchronously called
            //     // }
            // ))
            
            fulfillOrder(session);
        }

        res.status(200);

    } else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
    }
}