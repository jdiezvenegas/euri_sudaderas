import { useMutation, gql } from "@apollo/client";
import { GET_ITEMS_IN_CART } from "./goto";

const ADD_PRODUCT_TO_CART = gql`
    mutation AddProductToCart ($id: Int!) {
        addToCart(input: {productId: $id}) {
            clientMutationId
        }
    }
`;

export default function AddToCartButton({ id }) {
    const [addToCart, { loading, error }] = useMutation(ADD_PRODUCT_TO_CART);

    const handleAddToCart = (event) => {
        event.preventDefault();

        addToCart({
            variables: { id: id },
            refetchQueries: [{query: GET_ITEMS_IN_CART}]
        });
    }

    return (
        <div>
            <button disabled={loading} onClick={handleAddToCart}>
                Add to cart
            </button>
        </div>
    )
}