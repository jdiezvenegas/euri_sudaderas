import { useState, useEffect } from "react";
import { IconContext } from "react-icons";
import { FiShoppingCart } from "react-icons/fi";
import Link from "next/link";
import { getCartItemNumber } from "../utils";

function NavBar(props) {
  const logo = "/eurielec.svg";
  const logoReduced = "/eurielec_reduced.svg";
  const [imageSrc, setImageSrc] = useState(logoReduced);
  const [imageClass, setImageClass] = useState("logo reduced");
  const [cartItemNumber, setCartItemNumber] = useState(
    getCartItemNumber(props?.cart)
  );
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : null
  );

  useEffect(() => {
    setCartItemNumber(getCartItemNumber(props?.cart));
  }, [props.cart]);

  useEffect(() => {
    function handleResize() {
      setWidth(window?.innerWidth);
      if (window?.innerWidth > 600) {
        setImageSrc(logo);
        setImageClass("logo");
      } else {
        setImageSrc(logoReduced);
        setImageClass("logo reduced");
      }
    }
    handleResize();
    window?.addEventListener("resize", handleResize);
    return () => window?.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="navbar-container">
      <Link href="/">
        <img src={imageSrc} className={imageClass} alt="Eurielec's logo" />
      </Link>
      <div className="right-menu">
        <Link href="/products">Products</Link>
        <Link href="/faq">FAQ</Link>
        <a href="mailto:sudaderas@eurielec.etsit.upm.es">Contacto</a>
        <Link href="/cart">
          <div style={{cursor: 'pointer'}}>
            <IconContext.Provider value={{ size: "1.4em" }}>
              <FiShoppingCart />
            </IconContext.Provider>
            <span className="cart-items-number"> {cartItemNumber || 0} </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
