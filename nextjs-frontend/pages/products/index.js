import { useQuery, gql } from "@apollo/client";
import { ProductItem } from "../../components";

// const GET_PRODUCTS = gql`
//   query($id: ID!) {
//     product(id: $id) {
//       id
//       name
//       description
//       image {
//         url
//       }
//       category {
//         name
//         price
//         color
//         size
//         degree
//         model
//       }
//     }
//   }
// `;

const GET_PRODUCTS = gql`
  query {
    products {
      id
      Name
      Description
      Image {
        url
      }
      Category {
        Price
        Color
        Size
        Name
      }
    }
  }
`;

function ProductView() {
  const { data, loading, error } = useQuery(GET_PRODUCTS);
  console.log(data);
  if (loading) {
    return <h2>Loading</h2>;
  } else
    return (
      <div className="product-view-container">
        {data?.products.map(product => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    );
}

export default ProductView;
