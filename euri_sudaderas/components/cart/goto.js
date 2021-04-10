import { useContext } from 'react';
import { AppContext } from '../../context/app-context';

import Link from "next/link";

import { RiShoppingBasket2Line } from "react-icons/ri";

export default function GoToCartButton() {
  const [ cart, setCart ] = useContext(AppContext);
  
  return (
    <div className="cart-goto">
      <Link href="/cart">
        <div as='a'>
          <RiShoppingBasket2Line size={32} />{" "}
          <span>{cart}</span>
        </div>
      </Link>
    </div>
  );
}
