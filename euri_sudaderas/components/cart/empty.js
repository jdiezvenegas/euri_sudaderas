import { useMutation, gql } from "@apollo/client";
import { GET_ITEMS_IN_CART } from "./goto";
import { GET_CART } from "./list";

const EMPTY_CART = gql`
  mutation EmptyCart {
    removeItemsFromCart(input: { all: true }) {
      clientMutationId
    }
  }
`;

export default function EmptyCartButton() {
  const [emptyCart, { loading, error }] = useMutation(EMPTY_CART);

  const handleEmptyCart = event => {
    event.preventDefault();

    emptyCart({
      refetchQueries: [{ query: GET_CART }, { query: GET_ITEMS_IN_CART }]
    });
  };

  return (
    <div className="remove-button">
      <button disabled={loading} onClick={handleEmptyCart}>
        Empty cart
      </button>
    </div>
  );
}
