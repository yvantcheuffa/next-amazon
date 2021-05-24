import React from 'react';
import Image from 'next/image'
import { signIn, signOut, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { selectItems } from '../slices/basketSlice';

import {
    MenuIcon,
    SearchIcon,
    ShoppingCartIcon
} from '@heroicons/react/outline';

interface HeaderProps { }

export const Header: React.FC<HeaderProps> = ({ }) => {

    const [session] = useSession()
    const router = useRouter();
    const items = useSelector(selectItems);

    return (
        <header>
            {/* Top nav */}
            <div className='flex items-center space-x-2 bg-amazon_blue px-2 flex-grow py-2'>
                {/* Logo */}
                <div className='flex items-center pt-2 flex-grow sm:flex-grow-0'>
                    <Image
                        onClick={() => router.push('/')}
                        src={'https://links.papareact.com/f90'}
                        width={95}
                        height={33}
                        objectFit={'contain'}
                        className='cursor-pointer'
                    />
                </div>
                {/* Searchbar */}
                <div className='hidden sm:flex items-center h-9 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500'>
                    <input type="text" className='p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-3' />
                    <SearchIcon className='h-9 p-2' />
                </div>
                {/* Right section */}
                <div className='text-white text-xs flex items-center space-x-4 whitespace-nowrap'>
                    <div className='link' onClick={() => !session ? signIn() : signOut()}>
                        <p>{session ? `Hello, ${session.user.name}` : 'Sign In'}</p>
                        <p className='font-extrabold md:text-sm'>Account & Lists</p>
                    </div>
                    <div className='link'>
                        <p>Returns</p>
                        <p className='font-extrabold md:text-sm'>& Orders</p>
                    </div>
                    <div onClick={() => router.push('/checkout')} className='link relative flex items-center'>
                        <span className='absolute top-0 right-0 md:right-10 bg-yellow-400 text-center text-black font-bold w-4 h-4 rounded-full'>{items.length}</span>
                        <ShoppingCartIcon className='h-8' />
                        <p className='hidden md:inline font-extrabold md:text-sm mt-2'>Basket</p>
                    </div>
                </div>
            </div>
            {/* Bottom nav */}
            <div className='flex items-center space-x-4 bg-amazon_blue-light p-2 text-white text-xs'>
                <p className='link flex items-center space-x-1'>
                    <MenuIcon className='h-5' />
                    <span>All</span>
                </p>
                <p className='link'>Today's Deals</p>
                <p className='link'>Customer Service</p>
                <p className='link'>Gift Cards</p>
                <p className='link hidden lg:inline-flex'>Electronics</p>
                <p className='link hidden lg:inline-flex'>Food & Grocery</p>
                <p className='link hidden lg:inline-flex'>Prime</p>
                <p className='link hidden lg:inline-flex'>Buy Again</p>
                <p className='link hidden lg:inline-flex'>Shopper Toolkit</p>
                <p className='link hidden lg:inline-flex'>Health & Personal Care</p>

            </div>
        </header>
    )
}