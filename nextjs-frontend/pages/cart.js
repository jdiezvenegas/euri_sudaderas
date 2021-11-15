import { OrderRow } from "../components";
import AppContext from "/context/AppContext";
import { useContext } from "react";
// import { getCartPrice } from "../utils";

function Cart(props) {
  const appContext = useContext(AppContext);
  const { cart } = appContext;

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
      <button
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
    </div>
  );
}

export default Cart;
