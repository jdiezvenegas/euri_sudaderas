import ProductItem from '../products/item';

export default function CartItem({ data }) {
    const {
        product,
        quantity,
        total
    } = data

    return (
        <div>
            <ProductItem data={product.node} />
            <span>{quantity} - {total}</span>
            </div>
    )
}