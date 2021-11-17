import { useState } from "react";
import { OrderRow, GDPR } from "../components";
import AppContext from "/context/AppContext";
import { useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
// import { getCartPrice } from "../utils";

function Cart(props) {
  const { cart } = useContext(AppContext);
  const [read, setRead] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );

  const handleSubmit = async event => {
    event.preventDefault();
    if (!read) {
      alert("Por favor lee el documento de protección de datos.");
    }
    if (!accepted) {
      alert("Por favor acepta el tratamiento de tus datos.");
    }
    const url = "/api/checkout_sessions";
    const res = await fetch(url, {
      headers: { "content-type": "application/json" },
      body: JSON.stringify(cart),
      method: "POST"
    });
    console.log(res);
    const body = await res.json();
    window.location.href = body.url;
  };

  return (
    <div className="cart-container">
      <ul className="items-list">
        {cart.items
          ? cart.items.map(item => (
              <OrderRow key={item.id} amount={item.quantity} item={item} />
            ))
          : null}
      </ul>
      <div className="total">
        <span className="text"> Total </span>
        <span className="price"> {cart.total}€</span>
      </div>
      <GDPR setRead={setRead} read={read} setAccepted={setAccepted} />
      <form onSubmit={handleSubmit}>
        <button
          type="submit"
          className="pay-button"
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
