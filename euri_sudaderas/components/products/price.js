export default function ProductPrice({ onSale, regularPrice, price, type }){
    if (onSale) {
        return (<div className="product-price"><p>{price}</p><p className="regular-price">{regularPrice}</p></div>);
    }

    return <p className="product-price">{price}</p>;
}