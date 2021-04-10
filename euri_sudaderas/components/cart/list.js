import { useQuery, gql } from "@apollo/client";
import EmptyCartButton from "./empty";
import CartItem from './item';

export const GET_CART = gql`
    query GetCart {
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
            {items.map(({ cursor, node }) => <CartItem key={cursor} data={node} /> )}
            <h3>Total price:</h3>
            <span key={'total'}>{total}</span>
            <EmptyCartButton />
        </div>
    );
}