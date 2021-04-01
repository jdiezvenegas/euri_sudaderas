import parse, { domToReact } from 'html-react-parser';

import ProductImage from './image';
import ProductPrice from './price';

export default function ProductItem({ data }) {
    const {
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
            <ProductImage data={{image}} />
            <a className="product-name" href={link}>
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
            <ProductPrice
                type={type}
                onSale={onSale}
                price={price}
                regularPrice={regularPrice}
            />
        </div>
    )
}

