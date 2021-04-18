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
        <div className="cart-item-container">
            <ProductItem data={product.node} />
            {/* <span>{quantity} - {total}</span> */}
            <UpdateItemQuantityInput id={key} quantity={quantity} />
            <RemoveFromCartButton id={key} quantity={quantity} />
        </div>
    )
}