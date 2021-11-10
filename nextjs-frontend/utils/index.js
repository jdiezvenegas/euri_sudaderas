import client from "./apolloClient";
import {
  addToCart,
  removeFromCart,
  getCartItemNumber,
  getCartPrice
} from "./cart";

export { client, addToCart, removeFromCart, getCartItemNumber, getCartPrice };
