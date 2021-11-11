import client from "./apollo";
import {
  addToCart,
  removeFromCart,
  getCartItemNumber,
  getCartPrice
} from "./cart";

export { client, addToCart, removeFromCart, getCartItemNumber, getCartPrice };
