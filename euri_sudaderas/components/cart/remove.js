import { useMutation, gql } from "@apollo/client";
import { GET_ITEMS_IN_CART } from "./goto";
import { GET_CART } from './list';

const REMOVE_PRODUCT_FROM_CART = gql`
    mutation RemoveProductFromCart ($ids: [ID]!) {
        removeItemsFromCart(input: {keys: $ids}) {
            clientMutationId
        }
    }
`;

export default function RemoveFromCartButton({ id, quantity }) {
    const [removeFromCart, { loading, error }] = useMutation(REMOVE_PRODUCT_FROM_CART);

    const handleAddToCart = (event) => {
        event.preventDefault();

        removeFromCart({
            variables: {ids: [id]},
            refetchQueries: [{query: GET_CART}, {query: GET_ITEMS_IN_CART}]
        });
    }

    return (
        <div>
            <button disabled={loading} onClick={handleAddToCart}>
                Remove from cart
            </button>
        </div>
    )
}