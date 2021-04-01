import Image from 'next/image'

export default function ProductImage({ data }) {
    const { image } = data
    return image ? <Image
                src={image.sourceUrl}
                alt={image.altText}
                width={500}
                height={500}
            />
            : <Image
                src="http://place-puppy.com/640x640"
                alt="no product image"
                width={500}
                height={500}
            />;
}