import { useMutation, gql } from "@apollo/client";
import { useContext } from 'react';
import { AppContext } from '../../context/app-context';

import { GET_CART } from './list';

const REMOVE_PRODUCT_FROM_CART = gql`
    mutation ($ids: [ID]!) {
        removeItemsFromCart(input: {keys: $ids}) {
            clientMutationId
        }
    }
`;

export default function RemoveFromCartButton({ id, quantity }) {

    const [ cart, setCart ] = useContext( AppContext );
    const [removeFromCart, { loading, error }] = useMutation(REMOVE_PRODUCT_FROM_CART);

    const handleAddToCart = (event) => {
        event.preventDefault();
        
        if ( process.browser ) {

            let existingCart = localStorage.getItem('cart')
            
            if(existingCart) {

                existingCart = parseInt(existingCart)
                setCart(existingCart - quantity)
                localStorage.setItem('cart', existingCart - quantity)

            }
        }

        removeFromCart({
            variables: {ids: [id]},
            refetchQueries: [{query: GET_CART}]
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