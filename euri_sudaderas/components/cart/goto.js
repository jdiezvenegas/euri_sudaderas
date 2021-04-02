import { useQuery, gql } from "@apollo/client";
import Link from 'next/link';

const GET_CART_ITEM_COUNT = gql`
    query {
        cart {
            contents {
                itemCount
            }
        }
    }
`;

export default function GoToCartButton() {
    const { data, loading, error } = useQuery(GET_CART_ITEM_COUNT);
    return (
        <div>
            <Link href='/cart'><a>
                <p>Cart <span>{!loading ? data.cart.contents.itemCount : null }</span></p>
            </a></Link>
        </div>
    )
}