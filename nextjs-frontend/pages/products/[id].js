import { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";
import { addToCart, removeFromCart } from "../../utils";

const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
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
        Details
      }
    }
  }
`;

function ProductView(props) {
  const [selectedColor, setSelectedColor] = useState("White");
  const [selectedSize, setSelectedSize] = useState("L");

  const router = useRouter();
  const { id } = router.query;

  const { data, loading, error } = useQuery(GET_PRODUCT, {
    variables: { id }
  });

  function handleColorClick(e, key) {
    e.preventDefault();
    setSelectedColor(key);
  }

  if (loading) {
    return <h2>Loading</h2>;
  } else
    return (
      <div className="product-detail-container">
        <img
          className="product-detail-image"
          src={process.env.NEXT_PUBLIC_STRAPI_URL + data?.product?.Image[0].url}
          alt="Sudadera"
        />
        <div className="product-info-options">
          <h2 className="product-name">{data?.product?.Name}</h2>
          <p className="product-price">{data?.product?.Category?.Price}€</p>
          <p>{selectedColor}</p>
          <div className="product-colors-container">
            {Object.keys(data?.product?.Category?.Color).map(key => (
              // console.log(key)
              <div
                onClick={e => handleColorClick(e, key)}
                key={key}
                className={`color-square ${
                  selectedColor === key ? "selected" : ""
                }`}
                style={{ background: data?.product?.Category?.Color[key] }}
              ></div>
            ))}
          </div>
          <div className="product-size-container">
            <select
              name="size"
              id="size"
              className="size-selector"
              onChange={e => setSelectedSize(e.target.value)}
              value={selectedSize}
            >
              {Object.keys(data?.product?.Category?.Size).map(key => (
                <option value={key}>
                  {`${key} - L:${data?.product?.Category?.Size[key].length} W:${data?.product?.Category?.Size[key].width}`}
                </option>
              ))}
            </select>
          </div>
          <p>{data?.product?.Description}</p>
          <button
            className="add-button"
            onClick={e =>
              props.setCart(
                addToCart(props.cart, {
                  name: data?.product?.Name,
                  price: data?.product?.Category?.Price,
                  id: id,
                  color: selectedColor,
                  size: selectedSize
                })
              )
            }
          >
            Añadir a la cesta
          </button>

          <div className="product-details">
            <p className="details-title">Details</p>
            <p className="details-mini-title">Materials</p>
            <p className="details-text">
              {data?.product?.Category?.Details?.materials}
            </p>
            <p className="details-mini-title">Weight</p>
            {Object.keys(data?.product?.Category?.Details?.weight).map(key => (
              <p className="details-text">
                {key}: {data?.product?.Category?.Details?.weight[key]}
              </p>
            ))}
            <p className="details-mini-title">Care</p>
            <p className="details-text">
              {data?.product?.Category?.Details?.care}
            </p>
          </div>
        </div>
      </div>
    );
}

export default ProductView;
