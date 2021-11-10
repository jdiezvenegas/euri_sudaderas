const addToCart = (cart, product) => {
  let previousOrder = cart[product?.id] ?? [];
  previousOrder.push(product);
  cart[product?.id] = previousOrder;
  localStorage.setItem("cart", JSON.stringify(cart));
  return cart;
};

const removeFromCart = (cart, product) => {
  let previousOrder = cart[product?.id] ?? [];
  previousOrder.filter(i => i !== product);
  cart[product?.id] = previousOrder;
  localStorage.setItem("cart", JSON.stringify(cart));
  return cart;
};

const getCartItemNumber = cart => {
  let n = 0;
  Object.keys(cart || []).forEach(key => {
    n += cart[key].length;
  });
  return n;
};

const getCartPrice = cart => {
  let total = 0;
  Object.keys(cart || []).forEach(key => {
    total += cart[key].length * cart[key][0]?.price;
  });
  return total;
};

export { addToCart, removeFromCart, getCartItemNumber, getCartPrice };
