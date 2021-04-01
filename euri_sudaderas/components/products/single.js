// import { useRouter } from 'next/router'
import { useQuery, gql } from "@apollo/client";

import ProductItem from './item';

const GET_PRODUCT_BY_ID = gql`
    query MyQuery ($id: ID!) {
        product(id: $id) {
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
`;

export default function SingleProduct({ id }) {
    if (!id) {
        return <h2>Loading...</h2>;
    }

    const { data, loading, error } = useQuery(GET_PRODUCT_BY_ID, {
        variables: { id: id },
    });

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (error) {
        console.error(error);
        return null;
    }

    const product = data.product || {};

    return (
        <ProductItem data={product} />
    );
}