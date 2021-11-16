import { useQuery, gql } from "@apollo/client";
import { ProductItem, Loading } from "../../components";

const GET_PRODUCTS = gql`
  query {
    products {
      id
      Name
      Description
      Price
      Image {
        url
      }
    }
  }
`;

function ProductView() {
  const { data, loading, error } = useQuery(GET_PRODUCTS);
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="product-view-container">
      {data?.products.map(product => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductView;
