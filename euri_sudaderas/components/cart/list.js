import { useQuery, gql } from "@apollo/client";
import { useContext } from 'react';
import { AppContext } from '../../context/app-context';

import CartItem from './item';

export const GET_CART = gql`
    query {
        cart(recalculateTotals: true) {
            total
            contents {
                edges {
                    cursor
                    node {
                        key
                        product {
                            node {
                                databaseId
                                id
                                slug
                                name
                                type
                                shortDescription
                                image {
                                    id
                                    sourceUrl
                                    altText
                                }
                                galleryImages {
                                    nodes {
                                        id
                                        sourceUrl
                                        altText
                                    }
                                }
                                ... on SimpleProduct {
                                    onSale
                                    price
                                    regularPrice
                                }
                                ... on VariableProduct {
                                    onSale
                                    price
                                    regularPrice
                                }
                            }
                        }
                        total
                        quantity
                    }
                }
            }
        }
    }
  
`;

export default function CartList() {

    const [ cart, setCart ] = useContext( AppContext );
    const { data, loading, error } = useQuery(GET_CART, {
        fetchPolicy:"cache-and-network"
      });

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (error) {
        console.error(error);
        return null;
    }

    const items = data.cart.contents.edges;
    const total = data.cart.total || 0;

    return (
        <div>
            <p>Porducts in the cart: {cart}</p>
            {items.map(({ cursor, node }) => <CartItem key={cursor} data={node} /> )}
            <h3>Total price:</h3>
            <span key={'total'}>{total}</span>
        </div>
    );
}