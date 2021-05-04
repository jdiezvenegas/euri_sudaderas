import ProductItem from '../products/item';
import UpdateItemQuantityInput from './quantity';
import RemoveFromCartButton from './remove';

export default function CartItem({ data }) {
    const {
        product,
        variation,
        quantity,
        total,
        key
    } = data

    return (
        <div className="cart-item-container">
            <ProductItem data={product.node} />
            {variation && variation.attributes.map(({ name, value }) => <p>{value}</p>)}
            <UpdateItemQuantityInput id={key} quantity={quantity} />
            <RemoveFromCartButton id={key} quantity={quantity} />
        </div>
    )
}