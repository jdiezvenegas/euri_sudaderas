import Head from "next/head";
import { client } from "../utils";
import { ApolloProvider } from "@apollo/client";
// import { useCookies } from "react-cookie";
import AppContext from "/context/AppContext";
import { useEffect, useState } from "react";
import { Layout } from "../components";

import "../styles/style.scss";

export default function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState({ items: [], total: 0 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      var local_cart = localStorage.getItem("cart");

      if (typeof local_cart === "string" && local_cart !== "undefined") {
        setCart(JSON.parse(local_cart));
      }
    }
  }, []);

  useEffect(() => {
    console.log(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addItem = item => {
    let { items, total } = cart;
    //check for item already in cart
    //if not in cart, add item if item is found increase quanity ++
    const newItem = items.find(i => i.id === item.id);
    // if item is not new, add to cart, set quantity to 1
    if (!newItem) {
      //set quantity property to 1
      item.quantity = 1;
      setCart({
        items: [...items, item],
        total: total + item.price
      });
    } else {
      setCart({
        items: items.map(item =>
          item.id === newItem.id
            ? Object.assign({}, item, { quantity: item.quantity + 1 })
            : item
        ),
        total: total + item.price
      });
    }
  };

  const removeItem = item => {
    let { items, total } = cart;
    //check for item already in cart
    //if not in cart, add item if item is found increase quanity ++
    const newItem = items.find(i => i.id === item.id);
    if (newItem.quantity > 1) {
      setCart({
        items: items.map(item =>
          item.id === newItem.id
            ? Object.assign({}, item, { quantity: item.quantity - 1 })
            : item
        ),
        total: total - item.price
      });
    } else {
      const index = items.findIndex(i => i.id === newItem.id);

      items.splice(index, 1);
      setCart({ items: items, total: total - item.price });
    }
  };

  const countItems = () => {
    return cart.items.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  };

  const emptyCart = () => {
    setCart({ items: [], total: 0 });
    localStorage.setItem("cart", JSON.stringify({ items: [], total: 0 }));
  };

  return (
    <ApolloProvider client={client}>
      <AppContext.Provider
        value={{
          cart: cart,
          addItem: addItem,
          removeItem: removeItem,
          countItems: countItems,
          emptyCart: emptyCart
        }}
      >
        <Head>
          <title>Tienda Eurielec</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppContext.Provider>
    </ApolloProvider>
  );
}
