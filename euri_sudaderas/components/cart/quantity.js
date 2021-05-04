import { useMutation, gql } from "@apollo/client";
import { useState } from "react";
import { GET_ITEMS_IN_CART } from "./goto";
import { GET_CART_TOTAL } from "./total";

const UPDATE_ITEM_QUANTITY = gql`
    mutation UpdateItemQuantity ($id: ID!, $quantity: Int!) {
        updateItemQuantities(input: {items: {key: $id, quantity: $quantity}}) {
            cart {
                contents {
                    itemCount
                }
            }
        }
    }
`;

export default function UpdateItemQuantityInput({ id, quantity }) {
    const [ currentQuantity, setCurrentQuantity ] = useState(quantity)
    const [ updateItem, { loading, error } ] = useMutation(UPDATE_ITEM_QUANTITY);

    const incrementQuantity = (event) => {
        const current = parseInt(currentQuantity)
        setCurrentQuantity(current+1)
        updateItem({
            variables: {id: id, quantity: current+1},
            refetchQueries: [{query: GET_ITEMS_IN_CART}, {query: GET_CART_TOTAL}]
        });
    }

    const decrementQuantity = (event) => {
        const current = parseInt(currentQuantity)
        setCurrentQuantity(current-1)
        updateItem({
            variables: {id: id, quantity: current-1},
            refetchQueries: [{query: GET_ITEMS_IN_CART}, {query: GET_CART_TOTAL}]
        });
    }

    return (
        <div className="cart-quantity-adjust">
            <button disabled={loading || parseInt(currentQuantity) <= 1} onClick={decrementQuantity}>-</button>
            <span>{currentQuantity}</span>
            <button disabled={loading} onClick={incrementQuantity}>+</button>
        </div>
        // <input type="number" disabled={loading} onBlur={handleUpdateQuantity} onChange={(e) => setCurrentQuantity(e.target.value)} value={currentQuantity} />
    )
}