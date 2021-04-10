import Link from "next/link";
import { RiShoppingBasket2Line } from "react-icons/ri";
import { useQuery, gql } from "@apollo/client";

export const GET_ITEMS_IN_CART = gql`
  query GetItemsInCart {
    cart {
      contents {
        itemCount
      }
    }
  }
`;

export default function GoToCartButton() {
  const { data, loading, error } = useQuery(GET_ITEMS_IN_CART, {
    fetchPolicy:"cache-and-network"
  });
  
  return (
    <div className="cart-goto">
      <Link href="/cart">
        <div as='a'>
          <RiShoppingBasket2Line size={32} />{" "}
          <span>{data ? data.cart.contents.itemCount : 0}</span>
        </div>
      </Link>
    </div>
  );
}
