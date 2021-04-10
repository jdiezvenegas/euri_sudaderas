import { useMutation, gql } from "@apollo/client";
import { useState } from "react";
import { RiCurrencyFill } from "react-icons/ri";
import { GET_ITEMS_IN_CART } from "./goto";
import { GET_CART } from "./list";

const UPDATE_ITEM_QUANTITY = gql`
    mutation UpdateItemQuantity ($id: ID!, $quantity: Int!) {
        updateItemQuantities(input: {items: {key: $id, quantity: $quantity}}) {
            clientMutationId
        }
    }
`;

export default function UpdateItemQuantityInput({ id, quantity }) {
    const [ currentQuantity, setCurrentQuantity ] = useState(quantity)
    const [ updateItem, { loading, error } ] = useMutation(UPDATE_ITEM_QUANTITY);

    const handleUpdateQuantity = (event) => {
        event.preventDefault();

        if (parseInt(currentQuantity) !== quantity) {
            updateItem({
                variables: {id: id, quantity: parseInt(currentQuantity)},
                refetchQueries: [{query: GET_CART}, {query: GET_ITEMS_IN_CART}]
            });
        }
    }

    return (
        <div>
            <input type="number" disabled={loading} onBlur={handleUpdateQuantity} onChange={(e) => setCurrentQuantity(e.target.value)} value={currentQuantity} />
        </div>
    )
}