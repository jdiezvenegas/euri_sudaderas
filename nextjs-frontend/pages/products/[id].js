import { useEffect, useState } from "react";
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
      Price
      colors {
        id
        Name
        Hex
        Images {
          url
        }
      }
      models {
        id
        Name
        Images {
          url
        }
      }
      degrees {
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
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedDegree, setSelectedDegree] = useState("");
  const [selectedSize, setSelectedSize] = useState("L");
  const [correspondingImages, setCorrespondingImages] = useState([]);
  
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

    if(selectedColor && selectedModel && selectedDegree) {
      var correspondingList = data?.product?.Image.filter(image => {
        image = selectedColor?.Images?.find(elem => elem.url === image.url)
        if(!image) return false
        console.log(image.url)

        image = selectedModel?.Images?.find(elem => elem.url === image.url)
        if(!image) return false
        console.log(image.url)

        console.log(selectedDegree)
        image = selectedDegree?.Images?.find(elem => elem.url === image.url)
        if(!image) return false
        console.log(image.url)

        return image
      }).map(image => process.env.NEXT_PUBLIC_STRAPI_URL + image.url)

      console.log(correspondingList)

      if(correspondingList?.length) {
        setCorrespondingImages(correspondingList)
      } else {
        setCorrespondingImages([placeholder])
      }
    }
  }, [selectedColor, selectedModel, selectedDegree])

  if (loading) {
    return <h2>Loading</h2>;
  } else {
    // Defaul Values
    !selectedColor && setSelectedColor(data?.product?.colors[0])
    !selectedModel && setSelectedModel(data?.product?.models[0])
    !selectedDegree && setSelectedDegree(data?.product?.degrees[0])

    // console.log(data?.product?.degrees)


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
          {/* Product Model */}
          <div className="product-model-container">
            <select
              name="model"
              id="model"
              className="model-selector"
              onChange={e => setSelectedModel(data?.product?.models.find(model => model.Name === e.target.value))}
              value={selectedModel.Name}
            >
              {data?.product?.models.map(model => (
                <option key={model.id} value={model.Name}>
                  {model.Name}
                </option>
              ))}
            </select>
          </div>
          {/* Product Degree */}
          <div className="product-degree-container">
            <select
              name="degree"
              id="degree"
              className="degree-selector"
              onChange={e => setSelectedDegree(data?.product?.degrees.find(degree => degree.Name === e.target.value))}
              value={selectedDegree.Name}
            >
              {data?.product?.degrees.map(degree => (
                <option key={degree.id} value={degree.Name}>
                  {degree.Name}
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
                <option value={key}>
                  {`${key} - L:${data?.product?.Sizes[key].length} W:${data?.product?.Sizes[key].width}`}
                </option>
              ))}
            </select>
          </div>
          {/* Product Description */}
          <p>{data?.product?.Description}</p>

          {/* Add to Cart Button */}
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

          {/* Product Details */}
          <div className="product-details">
            <p className="details-title">Details</p>
            <p className="details-mini-title">Materials</p>
            <p className="details-text">
              {data?.product?.Details?.materials}
            </p>
            <p className="details-mini-title">Weight</p>
            {Object.keys(data?.product?.Details?.weight).map(key => (
              <p className="details-text">
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
