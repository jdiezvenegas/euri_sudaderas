// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;
const strapi_url = process.env.NEXT_PUBLIC_STRAPI_URL + "/graphql";

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

const storeOrderMutation = `mutation CreateOrder($stripe: String!, $email: String!, $paid: Boolean!, $items: JSON!, $price: Float!) {
    createOrder(
        input: { data: {StripeID:$stripe, Email:$email, Paid:$paid, Items:$items, Price:$price} }
    ) {
        order {
            id      
        }
    }
}`;

// const query = `query GetProduct($id: ID!) {
//     query getOrder($stripe: String!) {
//         orders(where: { StripeID: $stripe }) {
//           id
//         }
//       }(id: $id) {
//         PriceID
//     }
// }`;

const storeOrder = async (session) => {
    console.log(session.metadata.items)
    const order = await fetch(strapi_url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
                query: storeOrderMutation,
                variables: {
                stripe: session.payment_intent,
                email: session.customer_details.email,
                paid: session.payment_status === 'paid',
                items: JSON.parse(session.metadata.items),
                price: session.amount_total/100
            }
        })
    })

    console.log(order)
}

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

            // const { data } = await fetch(strapi_url, {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //         Accept: "application/json"
            //     },
            //     body: JSON.stringify({
            //         query,
            //         variables: { id: item.product_id }
            //     })
            // });

            // if(data.orders.length > 1) {}

            storeOrder(session)
            
            fulfillOrder(session);
        }

        return res.status(200);

    } else {
        res.setHeader("Allow", "POST");
        return res.status(405).end("Method Not Allowed");
    }
}