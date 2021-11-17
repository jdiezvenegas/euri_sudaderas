// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

export const config = {
    api: {
        bodyParser: false,
    },
}

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

export default async function handler(req, res) {
    if (req.method === "POST") {
        const payload = await webhookPayloadParser(req);
        const sig = req.headers['stripe-signature'];

        let event;

        try {
            event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
            console.log(event)
        } catch (err) {
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }

        res.status(200);
    }
}