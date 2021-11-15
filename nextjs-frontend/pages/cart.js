import { OrderRow } from "../components";
import AppContext from "/context/AppContext";
import { useContext } from "react";
import { loadStripe } from '@stripe/stripe-js';
// import { getCartPrice } from "../utils";

function Cart(props) {
  const { cart } = useContext(AppContext);

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = "/api/checkout_sessions";
    const res = await fetch(url, {
      headers: {"content-type": "application/json"},
      body: JSON.stringify(cart),
      method: "POST",
    })
    const body = await res.json()
    window.location.href = body.url
  }

  return (
    <div className="cart-container">
      <ul>
        {cart.items ? cart.items.map(item => (
          <OrderRow
            key={item.id}
            amount={item.quantity}
            item={item}
          />
        )) : null}
      </ul>
      <div className="total">
        <span className="text"> Total </span>
        <span className="price"> {cart.total}€</span>
      </div>
      <form onSubmit={handleSubmit}>
        <button type="submit" className="pay-button"
          // onClick={e =>
          //   props.setCart(
          //     addToCart(props.cart, {
          //       name: data?.product?.Name,
          //       price: data?.product?.Category?.Price,
          //       id: id,
          //       color: selectedColor,
          //       size: selectedSize
          //     })
          //   )
          // }
        >
          Pagar
        </button>
      </form>
    </div>
  );
}

export default Cart;
