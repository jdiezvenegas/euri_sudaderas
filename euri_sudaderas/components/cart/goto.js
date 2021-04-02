import { useQuery, gql } from "@apollo/client";
import Link from "next/link";
import { FaShoppingBasket } from "react-icons/fa";

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
  const { data, loading, error } = useQuery(GET_CART_ITEM_COUNT);
  return (
    <div className="cart-goto">
      <Link href="/cart">
        <a>
          <FaShoppingBasket />{" "}
          <span>{!loading ? data.cart.contents.itemCount : null}</span>
        </a>
      </Link>
    </div>
  );
}
