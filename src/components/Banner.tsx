import { ChevronLeftIcon } from '@heroicons/react/outline';
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface BannerProps { }

export const Banner: React.FC<BannerProps> = ({ }) => {

    const banners = Array.of(
        'https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_Home_v2_en_US_1x._CB429090084_.jpg',
        'https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_Toys_en_US_1x._CB431858161_.jpg',
        'https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_Computers_1x._CB432469755_.jpg',
        'https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_45M_v2_1x._CB432458380_.jpg',
        'https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_Beauty_v2_en_US_1x._CB429089975_.jpg',
        'https://images-na.ssl-images-amazon.com/images/G/01/CurrencyConverter/2020/AMZ_Associates_ACC_Banner_Evergreen_1500x600_v2._CB415565312_.jpg',

    )

    return (
        <div className='relative'>
            <div className='absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20' />
            <Carousel
                autoPlay
                infiniteLoop
                showIndicators={false}
                showThumbs={false}
                showStatus={false}
                interval={5000}>

                {banners.map((src, i) => (
                    <div key={i}>
                        <img src={src} loading='lazy' alt='' />
                    </div>
                ))}

            </Carousel>
        </div>
    )
}