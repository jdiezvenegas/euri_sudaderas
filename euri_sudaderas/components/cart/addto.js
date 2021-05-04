import { useMutation, gql } from "@apollo/client";
import { GET_ITEMS_IN_CART } from "./goto";

const ADD_PRODUCT_TO_CART = gql`
    mutation AddProductToCart ($id: Int!, $variation: Int!) {
        addToCart(input: {productId: $id, variationId: $variation}) {
            clientMutationId
        }
    }
`;

export default function AddToCartButton({ id, variation }) {
    const [addToCart, { loading, error }] = useMutation(ADD_PRODUCT_TO_CART);

    const handleAddToCart = (event) => {
        event.preventDefault();

        addToCart({
            variables: { id: id, variation: variation },
            refetchQueries: [{query: GET_ITEMS_IN_CART}]
        });
    }

    return (
        <div className="cart-addto">
            <button disabled={loading || !variation} onClick={handleAddToCart}>
                Add to cart
            </button>
        </div>
    )
}