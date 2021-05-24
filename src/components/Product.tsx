import { StarIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import { useState } from 'react';
import Currency from 'react-currency-formatter';
import { useDispatch } from 'react-redux';

import { addToBasket } from '../slices/basketSlice';

export type ProductType = {
    id: string
    title: string
    price: number
    description: string
    category: string
    image: string
}

interface ProductProps {
    product: ProductType
}

const MIN_RATING = 1;
const MAX_RATING = 5;

export const Product: React.FC<ProductProps> = ({ product: { id, title, price, description, category, image } }) => {
    const dispatch = useDispatch();

    const [rating] = useState(
        Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
    );
    const [hasPrime] = useState(Math.random() < 0.5);

    const addItemToBasket = () => {
        const product = { id, title, price, rating, description, category, image, hasPrime }

        // Sending the product as an action to the REDUX store... the basket slice
        dispatch(addToBasket(product))
    }

    return (
        <div className='flex relative flex-col bg-white m-5 z-30 p-10'>
            <p className='absolute top-2 right-2 text-xs italic text-gray-400'>{category}</p>
            <Image
                src={image}
                width={200}
                height={200}
                objectFit='contain'
            />
            <h4 className='my-3'>{title}</h4>
            <div className='flex'>
                {Array(rating).fill(0).map((_, i) => (
                    <StarIcon key={i} className='h-5 text-yellow-500' />
                ))}
            </div>
            <p className='text-xs my-2 line-clamp-2'>{description}</p>
            <div className='mb-5'>
                <Currency quantity={price} />
            </div>
            {hasPrime && (
                <div className='flex items-center space-x-2 -mt-5'>
                    <img loading='lazy' className='w-12' src="https://links.papareact.com/fdw" alt="" />
                    <p className='text-xs text-gray-500'>Free Next-day Delivery</p>
                </div>
            )}
            <button onClick={addItemToBasket} className='button mt-auto'>Add to Basket</button>
        </div>
    )
}