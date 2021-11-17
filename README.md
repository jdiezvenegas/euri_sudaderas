# Eurielc's store

Frontend and backend for the Eurielec's store

## Setup

To see it live:

- Clone the repository.
- Start the Strapi server: `cd ./tienda-backend && yarn && strapi dev`.
- In an other tab, start the nextjs server: `cd ./nextjs-frontend && yarn && yarn dev`.

## TODO

[x] Optimize images with Next.js/Images
[x] [Stripe webhooks](https://stripe.com/docs/payments/checkout/fulfill-orders) to store the orders in our backend
[x] Collect consent
    [x] Bug: aunque no lo aceptes te deja pagar igual
[x] Strapi import/export
[x] Añadir cursor: pointer
[x] Botón de pagar loading
[] Comprobar precio para evitar inyecciones
[] Feedback de errores al pagar
[] Backend warning: "API resolved without sending a response for /api/payment_completed, this may result in stalled requests."