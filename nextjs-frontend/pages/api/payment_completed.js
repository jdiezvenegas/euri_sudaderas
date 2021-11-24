// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;
const strapi_url = process.env.NEXT_PUBLIC_STRAPI_URL;

export const config = {
  api: {
    bodyParser: false
  }
};

// Sacado de https://github.com/vercel/next.js/discussions/13405#discussioncomment-405300
const webhookPayloadParser = req =>
  new Promise(resolve => {
    let data = "";
    req.on("data", chunk => {
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

const authStrapi = async () => {
  const res = await fetch(strapi_url + "/auth/local", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      identifier: process.env.STRAPI_ORDER_GENERATOR_USER,
      password: process.env.STRAPI_ORDER_GENERATOR_PASSWORD
    })
  });
  const body = await res.json();
  return body;
};

const storeOrder = async (session, jwt) => {
  console.log(session.metadata.items);
  const order = await fetch(strapi_url + "/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + jwt
    },
    body: JSON.stringify({
      query: storeOrderMutation,
      variables: {
        stripe: session.payment_intent,
        email: session.customer_details.email,
        paid: session.payment_status === "paid",
        items: JSON.parse(session.metadata.items),
        price: session.amount_total / 100
      }
    })
  });

  console.log(order);
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const payload = await webhookPayloadParser(req);
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const { jwt } = await authStrapi();
      console.log("JWT: " + jwt);

      // Store order in our backend (Strapi)
      storeOrder(session, jwt);

      return res.json({ received: true });
    } else return res.json({ received: true });
  } else {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }
}
