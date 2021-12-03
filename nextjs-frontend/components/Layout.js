import NavBar from "./NavBar";
import Message from "./Message";

function Layout({ children, cart, setCart }) {
  return (
    <>
      <NavBar cart={cart} setCart={setCart} />
      <Message />
      <main>{children}</main>
    </>
  );
}

export default Layout;
