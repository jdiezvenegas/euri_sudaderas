import ProductItem from '../products/item';
import RemoveFromCartButton from './remove';

export default function CartItem({ data }) {
    const {
        product,
        quantity,
        total,
        key
    } = data

    return (
        <div>
            <ProductItem data={product.node} />
            <span>{quantity} - {total}</span>
            <RemoveFromCartButton id={key} quantity={quantity} />
        </div>
    )
}