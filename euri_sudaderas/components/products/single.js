import { useQuery, gql } from "@apollo/client";
import parse, { domToReact } from "html-react-parser";
import Link from "next/link";

import ProductImage from "./image";
import ProductPrice from "./price";
import AddToCartButton from "../cart/addto";
import ProductItem from "./item";

const GET_PRODUCT_BY_ID = gql`
  query GetProductById($id: ID!) {
    product(id: $id) {
      databaseId
      id
      slug
      name
      type
      shortDescription
      description
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
    variables: { id: id }
  });

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  const product = data.product || {};

  const {
    databaseId,
    name,
    onSale,
    regularPrice,
    price,
    image,
    galleryImages,
    type,
    shortDescription,
    description,
    link
  } = product;

  return (
    <div className="single-item-container">
      <Link className="product-image" href={"/product/" + id.toString()}>
        <a>
          <ProductImage data={{ image }} />
        </a>
      </Link>
      <div className="name-and-sale-container">
        <Link className="product-image" href={"/product/" + id.toString()}>
          <a>
            <h3>{name}</h3>
          </a>
        </Link>
        {onSale && <>On Sale</>}
      </div>
      <div className="description-container">
        {shortDescription && (
          <>
            {parse(shortDescription, {
              replace({ name, children }) {
                if (name === "p") {
                  {
                    domToReact(children);
                  }
                }
              }
            })}
          </>
        )}
      </div>
      <ProductPrice
        type={type}
        onSale={onSale}
        price={price}
        regularPrice={regularPrice}
      />
      <AddToCartButton id={databaseId} />
    </div>
  );
}
