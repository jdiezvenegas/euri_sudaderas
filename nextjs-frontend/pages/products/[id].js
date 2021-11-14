import { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";
import AppContext from "/context/AppContext";
import { useContext } from "react";
import Link from "next/link";
// import { addToCart, removeFromCart } from "../../utils";

const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      Name
      Description
      Image {
        url
      }
      Price
      colors {
        id
        Name
        Hex
        Images {
          url
        }
      }
      designs {
        id
        Name
        Images {
          url
        }
      }
      Sizes
      Details
    }
  }
`;

function ProductView(props) {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedDesign, setSelectedDesign] = useState("");
  const [selectedSize, setSelectedSize] = useState("L");
  const [correspondingImages, setCorrespondingImages] = useState([]);

  const [productAdded, setProductAdded] = useState(false)

  const appContext = useContext(AppContext);
  
  const router = useRouter();
  const { id } = router.query;

  const { data, loading, error } = useQuery(GET_PRODUCT, {
    variables: { id }
  });

  function handleColorClick(e, color) {
    e.preventDefault();
    setSelectedColor(color);
  }

  useEffect(() => {
    const placeholder = process.env.PLACEHOLDER_IMAGE_URL

    if(selectedColor && selectedDesign) {
      var correspondingList = data?.product?.Image.filter(image => {
        image = selectedColor?.Images?.find(elem => elem.url === image.url)
        if(!image) return false

        image = selectedDesign?.Images?.find(elem => elem.url === image.url)
        if(!image) return false

        return image
      }).map(image => process.env.NEXT_PUBLIC_STRAPI_URL + image.url)

      if(correspondingList?.length) {
        setCorrespondingImages(correspondingList)
      } else {
        setCorrespondingImages([placeholder])
      }
    }
  }, [selectedColor, selectedDesign])

  if (loading) {
    return <h2>Loading</h2>;
  } else {
    // Defaul Values
    !selectedColor && setSelectedColor(data?.product?.colors[0])
    !selectedDesign && setSelectedDesign(data?.product?.designs[0])

    return (
      <div className="product-detail-container">

        {/* Product Images */}
        <img
          className="product-detail-image"
          src={correspondingImages[0]}
          alt="Sudadera"
        />

        {/* Product Info */}
        <div className="product-info-options">
          {/* Product Name and Price */}
          <h2 className="product-name">{data?.product?.Name}</h2>
          <p className="product-price">{data?.product?.Price}€</p>
          {/* Product Color */}
          <p>{selectedColor.Name}</p>
          <div className="product-colors-container">
            {data?.product?.colors.map(color => (
              <div
                onClick={e => handleColorClick(e, color)}
                key={color.id}
                className={`color-square ${
                  selectedColor === color ? "selected" : ""
                }`}
                style={{ background: color.Hex }}
              ></div>
            ))}
          </div>
          {/* Product Design */}
          <div className="product-design-container">
            <select
              name="design"
              id="design"
              className="design-selector"
              onChange={e => setSelectedDesign(data?.product?.designs.find(design => design.Name === e.target.value))}
              value={selectedDesign.Name}
            >
              {data?.product?.designs.map(design => (
                <option key={design.id} value={design.Name}>
                  {design.Name}
                </option>
              ))}
            </select>
          </div>
          {/* Product Size */}
          <div className="product-size-container">
            <select
              name="size"
              id="size"
              className="size-selector"
              onChange={e => setSelectedSize(e.target.value)}
              value={selectedSize}
            >
              {Object.keys(data?.product?.Sizes).map(key => (
                <option key={key} value={key}>
                  {`${key} - L:${data?.product?.Sizes[key].length} W:${data?.product?.Sizes[key].width}`}
                </option>
              ))}
            </select>
          </div>
          {/* Product Description */}
          <p>{data?.product?.Description}</p>

          {/* Add to Cart Button */}
          <button
            style={{cursor: 'pointer'}}
            className="add-button"
            onClick={e => {
                appContext.addItem(
                  {
                    name: data?.product?.Name,
                    price: data?.product?.Price,
                    id: id+"-"+selectedColor.id+"-"+selectedDesign.id+"-"+selectedSize,
                    color: selectedColor.Name,
                    design: selectedDesign.Name,
                    size: selectedSize
                  }
                );
                setProductAdded(true);
              }
            }
          >
            Añadir a la cesta
          </button>
          {productAdded && <p>Producto añadido a la <Link href="/cart">cesta</Link></p>}
          {/* Product Details */}
          <div className="product-details">
            <p className="details-title">Details</p>
            <p className="details-mini-title">Materials</p>
            <p className="details-text">
              {data?.product?.Details?.materials}
            </p>
            <p className="details-mini-title">Weight</p>
            {Object.keys(data?.product?.Details?.weight).map(key => (
              <p key={key} className="details-text">
                {key}: {data?.product?.Details?.weight[key]}
              </p>
            ))}
            <p className="details-mini-title">Care</p>
            <p className="details-text">
              {data?.product?.Details?.care}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductView;
