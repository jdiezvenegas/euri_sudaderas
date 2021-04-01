export default function ProductPrice({ onSale, regularPrice, price, type }){
    if (onSale) {
        return type === 'VARIABLE'
            ? (<p className="product-price">{price}</p>)
            : (<p className="product-price"><span className="regular-price">{regularPrice}</span> - {price}</p>);
    }

    return <p className="product-price">{price}</p>;
}