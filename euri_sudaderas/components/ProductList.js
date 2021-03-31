import { useQuery, gql } from "@apollo/client";

import ProductItem from './ProductItem'

const QUERY = gql`
    query ($first: Int, $after: String) {
        products(first: $first, after: $after, where: { supportedTypesOnly: true }) {
            edges {
                cursor
                node {
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
        }
    }
`;

export default function ProductList() {
    const { data, loading, error } = useQuery(QUERY);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (error) {
        console.error(error);
        return null;
    }

    const products = data.products.edges || [];

    return (
        <div>
            {products.map(({ cursor, node, }) => <ProductItem key={cursor} data={node} /> )}
        </div>
    );
}