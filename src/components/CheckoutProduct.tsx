import React from 'react';
import Image from 'next/image';
import Currency from 'react-currency-formatter';
import { useDispatch } from 'react-redux'
import { addToBasket, removeFromBasket } from '../slices/basketSlice';

import { ProductType } from './Product';
import { StarIcon } from '@heroicons/react/outline';

interface CheckoutProductProps {
    product: ProductType & {
        rating: number
        hasPrime: boolean
    }
}

export const CheckoutProduct: React.FC<CheckoutProductProps> = ({ product: { id, title, price, rating, description, category, image, hasPrime } }) => {

    const dispatch = useDispatch();

    const addItemToBasket = () => {
        const product = { id, title, price, rating, description, category, image, hasPrime }
        // Push item to redux store
        dispatch(addToBasket(product))
    }

    const removeItemFromBasket = () => {
        // Remove the item from redux store
        dispatch(removeFromBasket({ id }))
    }

    return (
        <div className='grid grid-cols-5 border-b pb-5 last:border-none'>
            {/* Left side occupies 1 cell */}
            <Image
                src={image}
                height={200}
                width={200}
                objectFit='contain'
            />
            {/* Middle occupies 3 cells */}
            <div className='col-span-4 md:col-span-3 mx-5'>
                <p>{title}</p>
                <div className='flex mt-2'>
                    {Array(rating).fill(0).map((_, i) => (
                        <StarIcon key={i} className='h-5 text-yellow-500' />
                    ))}
                </div>
                <p className='my-2 text-sx line-clamp-3'>
                    {description}
                </p>
                <div className='mb-5'>
                    <Currency quantity={price} />
                </div>
                {hasPrime && (
                    <div className='flex items-center space-x-2'>
                        <img className='w-12' loading='lazy' src="https://links.papareact.com/fdw" alt="" />
                        <p className='text-xs text-gray-500'>Free Next-day Delivery</p>
                    </div>
                )}
            </div>
            {/* Right side occupies 1 cell */}
            <div className='mt-4 md:mt-0 col-span-full md:col-span-1 flex flex-col space-y-2 my-auto justify-end'>
                <button onClick={addItemToBasket} className='button mt-auto'>Add to Basket</button>
                <button onClick={removeItemFromBasket} className='button mt-auto'>Remove from Basket</button>
            </div>
        </div>
    )
}