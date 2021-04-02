import parse, { domToReact } from "html-react-parser";
import Link from "next/link";

import ProductImage from "./image";
import ProductPrice from "./price";
import AddToCartButton from "../cart/addto";

export default function ProductItem({ data }) {
  const {
    databaseId,
    id,
    name,
    onSale,
    regularPrice,
    price,
    image,
    galleryImages,
    type,
    shortDescription: description,
    link
  } = data;

  return (
    <div className="product-item-container">
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
        {onSale && (
          <>
            On Sale
            <br />
          </>
        )}
      </div>
      {description && (
        <>
          <br />
          {parse(description, {
            replace({ name, children }) {
              if (name === "p") {
                return <small>{domToReact(children)}</small>;
              }
            }
          })}
        </>
      )}
      <ProductPrice
        type={type}
        onSale={onSale}
        price={price}
        regularPrice={regularPrice}
      />
      <AddToCartButton id={databaseId} className="product-button" />
    </div>
  );
}
