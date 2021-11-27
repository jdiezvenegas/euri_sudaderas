import Link from "next/link";
import Image from "next/image";

function ProductItem(props) {
  const {
    id,
    Name: name,
    Image: image,
    Price: price,
    Description: description,
    External: external,
    Available: available
  } = props.product;

  if (available)
    return (
      <Link href={external ? external : `/products/${id}`}>
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

  return (
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
        <p className="not-available">Próximamente</p>
      </div>
    </div>
  );
}

export default ProductItem;
