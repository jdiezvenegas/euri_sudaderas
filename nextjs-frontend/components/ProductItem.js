import Link from "next/link";

function ProductItem(props) {
  console.log(props.product);
  const {
    id,
    Name: name,
    Image: image,
    Price: price,
    Description: description
  } = props.product;
  console.log(image);

  return (
    <Link href={`/products/${id}`}>
      <div className="product-item-container">
        <img
          src={process.env.NEXT_PUBLIC_STRAPI_URL + image[0].url}
          className="product-image"
          alt="Product"
        />
        <div className="product-info">
          <p className="product-name">{name}</p>
          <p>{price}€</p>
        </div>
      </div>
    </Link>
  );
}

export default ProductItem;
