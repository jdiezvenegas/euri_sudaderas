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
      External
      Available
    }
  }
`;

function ProductView() {
  const { data, loading, error } = useQuery(GET_PRODUCTS);
  if (loading) {
    return <Loading />;
  }

  // console.log(error);
  // console.log(data);
  return (
    <div className="product-view-container">
      {[...data?.products]
        .sort((a, b) => (b.External ? -10 : 1))
        .map(product => (
          <ProductItem key={product.id} product={product} />
        ))}
    </div>
  );
}

export default ProductView;
