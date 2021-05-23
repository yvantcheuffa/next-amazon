import { title } from 'process';
import React from 'react';
import { Product } from '.';
import { ProductType } from './Product';

interface ProductFeedProps {
    products: ProductType[]
}

export const ProductFeed: React.FC<ProductFeedProps> = ({ products }) => {
    return (
        <div className='grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto'>
            {products.slice(0, 4).map((product) => (
                <Product
                    product={product}
                    key={product.id}
                />
            ))}
            <img className='md:col-span-full' src='https://links.papareact.com/dyz' alt='' />
            <div className='md:col-span-2'>
                {products.slice(4, 5).map((product) => (
                    <Product
                        product={product}
                        key={product.id}
                    />
                ))}
            </div>
            {products.slice(5, products.length).map((product) => (
                <Product
                    product={product}
                    key={product.id}
                />
            ))}
        </div>
    )
}