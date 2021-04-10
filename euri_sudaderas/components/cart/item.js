import ProductItem from '../products/item';
import UpdateItemQuantityInput from './quantity';
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
            <UpdateItemQuantityInput id={key} quantity={quantity} />
            <span>{quantity} - {total}</span>
            <RemoveFromCartButton id={key} quantity={quantity} />
        </div>
    )
}