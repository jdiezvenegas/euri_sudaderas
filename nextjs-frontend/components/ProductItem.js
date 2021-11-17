import Link from "next/link";
import Image from "next/image";

function ProductItem(props) {
  const {
    id,
    Name: name,
    Image: image,
    Price: price,
    Description: description
  } = props.product;

  return (
    <Link href={`/products/${id}`}>
      <div className="product-item-container">
        <Image
          src={process.env.NEXT_PUBLIC_STRAPI_URL + image[0].url}
          className="product-image"
          height={200}
          width={200}
          layout="intrinsic"
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
