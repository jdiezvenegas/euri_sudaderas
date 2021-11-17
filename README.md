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
    [] Bug: aunque no lo aceptes te deja pagar igual
[] Strapi import/export
[] Añadir cursor: pointer
[] Botón de pagar loading