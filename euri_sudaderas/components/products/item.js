import parse, { domToReact } from "html-react-parser";
import { useState, useEffect } from "react";
import Link from "next/link";

import ProductImage from "./image";
import ProductPrice from "./price";
import AddToCartButton from "../cart/addto";

export default function ProductItem({ data }) {
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [variation, setVariation] = useState("");
  const [currentImage, setCurrentImage] = useState(data.image);

  const {
    databaseId,
    id,
    name,
    onSale,
    regularPrice,
    price,
    image,
    type,
    shortDescription,
    description,
    link,
    variations,
    paColors,
    paSizes
  } = data;

  useEffect(() => {
    if (size && color) {
      variations.nodes.forEach(node => {
        if (
          node.attributes.nodes.some(node => node.value === color) &&
          node.attributes.nodes.some(node => node.value === size)
        ) {
          setVariation(node.databaseId);
        }
      });
    }
  }, [color, size]);

  const colorChange = e => {
    e.target.checked && setColor(e.target.value);

    e.target.checked &&
      variations.nodes.forEach(node => {
        if (node.attributes.nodes.some(node => node.value === color)) {
          setCurrentImage(node.image);
        }
      });
  };

  const sizeChange = e => {
    e.target.checked && setSize(e.target.value);
  };

  return (
    <div className="product-item-container">
      <Link className="product-image" href={"/product/" + id.toString()}>
        <a>
          <ProductImage data={{ image: currentImage }} />
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
      <form>
        {paColors &&
          paColors.nodes.map(color => (
            <label htmlFor={color.name}>
              <input
                type="radio"
                name="paColors"
                value={color.name}
                id={color.name}
                onChange={colorChange}
              />
              {color.name}
            </label>
          ))}
      </form>

      <form>
        {paSizes &&
          paSizes.nodes.map(size => (
            <label htmlFor={size.name}>
              <input
                type="radio"
                name="paSizes"
                value={size.name}
                id={size.name}
                onChange={sizeChange}
              />
              {size.name}
            </label>
          ))}
      </form>
      <ProductPrice
        type={type}
        onSale={onSale}
        price={price}
        regularPrice={regularPrice}
      />
      <AddToCartButton id={databaseId} variation={variation} />
    </div>
  );
}
