import { useQuery, gql } from "@apollo/client";

import CartItem from './item';

const GET_CART = gql`
    query {
        cart(recalculateTotals: true) {
            total
            contents {
                edges {
                    cursor
                    node {
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
    const { data, loading, error } = useQuery(GET_CART);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (error) {
        console.error(error);
        return null;
    }

    const cart = data.cart || [];

    return (
        <div>
            {cart.contents.edges.map(({ cursor, node }) => <CartItem key={cursor} data={node} /> )}
            <h3>Total price:</h3>
            <span key={'total'}>{cart.total}</span>
        </div>
    );
}