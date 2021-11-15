import Cors from 'cors'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Initializing the cors middleware
const cors = Cors({
  methods: ['POST'],
  origin: "https://checkout.stripe.com"
  // origin: process.env.NEXT_PUBLIC_FRONTEND_URL
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export default async function handler(req, res) {
  // Run the middleware
  // await runMiddleware(req, res, cors)

  if (req.method === 'POST') {
    try {
      const line_items = req.body.items.map(item => {
        return {
          price: 'price_1Jw7S2Dvv5YbSUbaCNq0xeUi',
          quantity: item.quantity,
          description: [item.name, item.design, item.color, item.size].join(" - ")
        }
      })
      console.log(line_items)
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: line_items,
        payment_method_types: [
          'card',
        ],
        mode: 'payment',
        // consent_collection: {GDPR: "blablabla"},
        success_url: `${req.headers.origin}/payments/success`,
        cancel_url: `${req.headers.origin}/payments/cancel`,
      });
      console.log(session)
      res.json({url: session.url})
      // res.redirect(303, session.url);
    } catch (err) {
      console.log(err)
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}