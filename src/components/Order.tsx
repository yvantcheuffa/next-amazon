import moment from "moment";
import React from "react";
import Currency from 'react-currency-formatter';

interface OrderProps {
    key: string
    id: string
    amount: number
    amountShipping: any
    items: any
    timestamp: any
    images: any
}

export const Order: React.FC<OrderProps> = ({ key, id, amount, amountShipping, items, timestamp, images }) => {
    return (
        <div className='relative rounded-md border'>
            <div className="flex items-center space-x-10 p-5 bg-gray-100 text-sm text-gray-600">
                <div>
                    <p className="font-bold text-xs">ORDER PLACED</p>
                    <p>{moment.unix(timestamp).format('DD MMM YYYY')}</p>
                </div>
                <div>
                    <p className="font-bold text-xs">TOTAL</p>
                    <p>
                        <Currency quantity={amount} /> - Next Day Delivery{' '}
                        <Currency quantity={23} />
                    </p>
                </div>
                <p className="whitespace-nowrap text-sm sm:text-xl text-right flex-1 text-blue-500">
                    {items.length} item(s)
                </p>
                <p className='absolute top-2 right-2 w-40 lg:w-72 truncate whitespace-nowrap text-xs'>
                    ORDER # {id}
                </p>
            </div>
            <div className='p-5 sm:p-10'>
                <div className='flex space-x-6 overflow-x-auto'>
                    {images.map((image, key) => (
                        <img key={key} src={image} alt="" className='h-20 object-contain sm:h-32' />
                    ))}
                </div>
            </div>
        </div>
    )
}