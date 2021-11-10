import { OrderRow } from "../components";
import { getCartPrice } from "../utils";

function Cart(props) {
  return (
    <div className="cart-container">
      {Object.keys(props?.cart).map(key => (
        <OrderRow
          key={key}
          amount={props.cart[key].length}
          items={props.cart[key]}
        />
      ))}
      <div className="total">
        <span className="text"> Total </span>
        <span className="price"> {getCartPrice(props?.cart)}€</span>
      </div>
      <button
        className="pay-button"
        onClick={e =>
          props.setCart(
            addToCart(props.cart, {
              name: data?.product?.Name,
              price: data?.product?.Category?.Price,
              id: id,
              color: selectedColor,
              size: selectedSize
            })
          )
        }
      >
        Pagar
      </button>
    </div>
  );
}

export default Cart;
