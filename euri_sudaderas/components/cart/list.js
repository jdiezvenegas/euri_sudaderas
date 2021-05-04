import { useQuery, gql } from "@apollo/client";
import EmptyCartButton from "./empty";
import CartItem from './item';
import CartTotal from './total';

export const GET_CART = gql`
    query GetCart {
        cart(recalculateTotals: true) {
            contents {
                edges {
                    cursor
                    node {
                        key
                        variation {
                            attributes {
                                name
                                value
                            }
                        }
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

    return (
        <div className="cart-list-container">
            {items && items.map(({ cursor, node }) => <CartItem key={cursor} data={node} /> )}
            <CartTotal />
            <EmptyCartButton />
        </div>
    );
}