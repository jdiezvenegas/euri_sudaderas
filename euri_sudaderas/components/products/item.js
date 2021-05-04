import parse, { domToReact } from "html-react-parser";
import { useState, useEffect } from "react";
import Link from "next/link";

import ProductImage from "./image";
import ProductPrice from "./price";
import AddToCartButton from "../cart/addto";

export default function ProductItem({ data }) {
  const [ size, setSize ] = useState("")
  const [ color, setColor ] = useState("")
  const [ variation, setVariation ] = useState("")
  const {
    databaseId,
    id,
    name,
    onSale,
    regularPrice,
    price,
    image,
    type,
    shortDescription: description,
    variations,
    paColors,
    paSizes
  } = data;

  useEffect(() => {
    if (size && color){
      variations.nodes.forEach(node => {
        if (node.attributes.nodes.some(node => node.value===color) && node.attributes.nodes.some(node => node.value===size)) {
          console.log(node)
          setVariation(node.databaseId)
        }
      })
    }
  }, [color, size]);

  const colorChange = e => {
    e.target.checked && setColor(e.target.value)
  }

  const sizeChange = e => {
    e.target.checked && setSize(e.target.value)
  }


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

        <form>
          {paColors && paColors.nodes.map((color) => (
            <label htmlFor={color.name}>{color.name}
              <input type="radio" name="paColors" value={color.name} id={color.name} onChange={colorChange} />
            </label>
          ))}
        </form>

        <form>
          {paSizes && paSizes.nodes.map((size) => (
            <label htmlFor={size.name}>{size.name}
              <input type="radio" name="paSizes" value={size.name} id={size.name} onChange={sizeChange} />
            </label>
          ))}
        </form>

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
      <AddToCartButton id={databaseId} variation={variation} />
    </div>
  );
}
