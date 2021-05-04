import { useQuery, gql } from "@apollo/client";

export const GET_CART_TOTAL = gql`
    query GetCart {
        cart(recalculateTotals: true) {
            total
        }
    }
`;

export default function CartTotal() {
    const { data, loading, error } = useQuery(GET_CART_TOTAL, {
        fetchPolicy:"cache-and-network"
    });

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (error) {
        console.error(error);
        return null;
    }

    const total = data.cart.total || 0;

    return (
        <div className="cart-total">
            <h3>Total price:</h3>
            <span>{total}</span>
        </div>
    );
}