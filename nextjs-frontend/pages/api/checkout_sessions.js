const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const strapi_url = process.env.NEXT_PUBLIC_STRAPI_URL + "/graphql";

const query = `query GetProduct($id: ID!) {
  product(id: $id) {
    PriceID
  }
}`;

const mutation = `mutation CreateOrder($stripe: String!, $email: String!, $paid: Boolean!, $items: JSON!, $price: Float!) {
  createOrder(
    input: { data: {StripeID:$stripe, Email:$email, Paid:$paid, Items:$items, Price:$price} }
  ) {
    order {
			id      
    }
  }
}`;

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const line_items = await Promise.all(
        req.body.items.map(async item => {
          const res = await fetch(strapi_url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify({
              query,
              variables: { id: item.product_id }
            })
          });
          const body = await res.json();

          return {
            price: body.data.product.PriceID,
            quantity: item.quantity,
            description: [item.name, item.design, item.color, item.size].join(
              " - "
            )
          };
        })
      );
      console.log(line_items);

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: line_items,
        payment_method_types: ["card"],
        mode: "payment",
        // consent_collection: {GDPR: "blablabla"},
        success_url: `${req.headers.origin}/payments/success`,
        cancel_url: `${req.headers.origin}/payments/cancel`
      });

      const order = await fetch(strapi_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          query: mutation,
          variables: {
            "stripe": session.id,
            "email": "",
            "paid": false,
            "items": line_items,
            "price": session.amount_total/100
          }
        })
      })

      console.log(order)

      res.json({ url: session.url });
      // res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
