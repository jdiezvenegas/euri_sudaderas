import NavBar from "./NavBar";

function Layout({ children, cart, setCart }) {
  return (
    <>
      <NavBar cart={cart} setCart={setCart} />
      <main>{children}</main>
    </>
  );
}

export default Layout;
