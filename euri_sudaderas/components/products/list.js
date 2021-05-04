import { useQuery, gql } from "@apollo/client";

import ProductItem from "./item";

const GET_PRODUCTS = gql`
  query GetProducts ($first: Int, $after: String) {
    products(
      first: $first
      after: $after
      where: { supportedTypesOnly: true }
    ) {
      edges {
        cursor
        node {
          databaseId
          id
          name
          type
          shortDescription
          image {
            id
            sourceUrl
            altText
          }
          ... on VariableProduct {
            onSale
            price
            regularPrice
            variations {
              nodes {
                name
                databaseId
                attributes {
                  nodes {
                    value
                    name
                  }
                }
              }
            }
          }
          paColors {
            nodes {
              name
            }
          }
          paSizes {
            nodes {
              name
            }
          }
        }
      }
    }
  }
`;

export default function ProductList() {
  const { data, loading, error } = useQuery(GET_PRODUCTS, {variables: {first: 20}});

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  const products = data.products.edges || [];

  return (
    <div className="products-list-container">
      {products.map(({ cursor, node }) => (
        <ProductItem key={cursor} data={node} />
      ))}
    </div>
  );
}
