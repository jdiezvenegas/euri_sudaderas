import { useMutation, gql } from "@apollo/client";

const ADD_PRODUCT_TO_CART = gql`
    mutation ($id: Int!) {
        addToCart(input: {productId: $id}) {
            clientMutationId
        }
    }
`;

export default function AddToCartButton({ id }) {
    const [addToCart, { loading, error }] = useMutation(ADD_PRODUCT_TO_CART);

    const handleAddToCart = (event) => {
        event.preventDefault();

        addToCart({ variables: { id: id } });
    }

    return (
        <div>
            <button disabled={loading} onClick={handleAddToCart}>
                Add to cart
            </button>
        </div>
    )
}