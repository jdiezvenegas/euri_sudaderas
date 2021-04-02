import parse, { domToReact } from 'html-react-parser';
import Link from 'next/link';

import ProductImage from './image';
import ProductPrice from './price';
import AddToCartButton from '../cart/addto';

export default function ProductItem({ data }) {
    const {
        databaseId,
        id,
        name,
        onSale,
        regularPrice,
        price,
        image,
        galleryImages,
        type,
        shortDescription: description,
        link,
    } = data;

    return(
        <div>
            <h3>{name}</h3>
            <Link className="product-name" href={'/product/'+id.toString()}>
                <a>
                    <ProductImage data={{image}} />
                    {onSale && (
                        <>
                            <span className="badge">On Sale</span>
                            <br />
                        </>
                    )}
                    {name}
                    {description && (
                        <>
                            <br />
                            {parse(description, {
                                replace({ name, children }) {
                                    if (name === 'p') {
                                        return <small>{domToReact(children)}</small>;
                                    }
                                }
                            })}
                        </>
                    )}
                </a>
            </Link>
            <ProductPrice
                type={type}
                onSale={onSale}
                price={price}
                regularPrice={regularPrice}
            />
            <AddToCartButton id={databaseId} />
        </div>
    )
}

