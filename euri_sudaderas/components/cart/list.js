import { useQuery, gql } from "@apollo/client";

import ProductItem from '../products/item';

const GET_CART = gql`
    query {
        cart(recalculateTotals: true) {
            total
            contents {
                nodes {
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
  
`;

export default function ProductList() {
    const { data, loading, error } = useQuery(GET_CART);
    console.log(data)

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
            {cart.contents.nodes.map(({ product, quantity, total }) => <div><ProductItem data={product.node} /> <span>{quantity} - {total}</span></div> )}
            <span>{cart.total}</span>
        </div>
    );
}