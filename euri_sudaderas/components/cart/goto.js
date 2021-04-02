import { useQuery, gql } from "@apollo/client";
import { useContext } from 'react';

import Link from "next/link";

import { RiShoppingBasket2Line } from "react-icons/ri";

const GET_CART_ITEM_COUNT = gql`
  query {
    cart {
      contents {
        itemCount
      }
    }
  }
`;

export default function GoToCartButton() {
  console.log(useContext())
  const { data, loading, error } = useQuery(GET_CART_ITEM_COUNT);
  return (
    <div className="cart-goto">
      <Link href="/cart">
        <a>
          <RiShoppingBasket2Line size={32} />{" "}
          <span>{!loading ? data.cart.contents.itemCount : null}</span>
        </a>
      </Link>
    </div>
  );
}
