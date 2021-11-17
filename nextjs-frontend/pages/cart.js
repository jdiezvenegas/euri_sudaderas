import { useState } from "react";
import { OrderRow, GDPR } from "../components";
import AppContext from "/context/AppContext";
import { useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Loading } from "../components";
// import { getCartPrice } from "../utils";

function Cart(props) {
  const { cart } = useContext(AppContext);
  const [paying, setPaying] = useState(false)
  const [paymentError, setPaymentError] = useState(false)
  const [read, setRead] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );

  const handleSubmit = async event => {
    event.preventDefault();
    
    if (!read) {
      alert("Por favor lee el documento de protección de datos.");
      return;
    } else {
      if (!accepted) {
        alert("Por favor acepta el tratamiento de tus datos.");
        return;
      }
    }
    if (read && accepted) {
      setPaying(true)
      setPaymentError(false)

      const url = "/api/checkout_sessions";
      const res = await fetch(url, {
        headers: { "content-type": "application/json" },
        body: JSON.stringify(cart),
        method: "POST"
      });
      console.log(res);

      if (res.status === 200) {
        const body = await res.json();
        body.url ? (window.location.href = body.url) : console.log(body);
      } else {
        setPaying(false)
        setPaymentError(true)
      }
    }
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
      <GDPR
        setRead={setRead}
        read={read}
        setAccepted={setAccepted}
        accepted={accepted}
      />
      {
        paying ? (<Loading />) : (
          <form onSubmit={handleSubmit}>
            <button type="submit" className="pay-button">
              Pagar
            </button>
          </form>
        )
      }
      { paymentError && (<p>No se pudo procesar el pago</p>) }
      
    </div>
  );
}

export default Cart;
