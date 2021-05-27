import Head from "next/head";
import React from "react";
import Image from 'next/image';
import Currency from 'react-currency-formatter';

import { Header, CheckoutProduct } from "../components"
import { useSelector } from "react-redux";
import { selectItems, selectTotal } from "../slices/basketSlice";
import { ProductType } from "../components/Product";
import { useSession } from "next-auth/client";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(process.env.stripe_public_key);

const Checkout = ({ }) => {

    const createCheckoutSession = async () => {
        const stripe = await stripePromise;

        // Call the backend to create a checkout session
        const checkoutSession = await axios.post('/api/create-checkout-session', {
            items: items,
            email: session.user.email
        });
        
        // Redirect user/customer to Stripe checkout
        const result = await stripe.redirectToCheckout({
            sessionId: checkoutSession.data.id
        })
        if(result.error) {
            alert(result.error.message)
        }
        
    }

    const items = useSelector(selectItems);
    const total = useSelector(selectTotal)
    const [session] = useSession();
    return (
        <div className='bg-gray-100'>
            <Head>
                <title>Checkout</title>
                <meta name="description" content="Amazon Clone Built By TCS@CORP" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main className='lg:flex max-w-screen-2xl mx-auto'>
                {/* Left side */}
                <div className='flex-grow m-5 shadow-sm'>
                    <Image
                        objectFit='contain'
                        src='https://links.papareact.com/ikj'
                        width={1020}
                        height={250}
                    />
                    <div className='flex p-5 flex-col space-y-5 bg-white'>
                        <h1 className='text-3xl border-b pb-4'>{items.length !== 0 ? 'Your Shopping Basket' : 'Your Amazon Basket is empty.'}</h1>
                        {items.map((item, i) => (
                            <CheckoutProduct product={item} key={i} />
                        ))}
                    </div>
                </div>
                {/* Right side */}
                <div className='whitespace-nowrap bg-white p-10 shadow-md'>
                    {items.length > 0 && (
                        <>
                            <h2>Subtotal {items.length} item(s): {' '}
                                <span className='font-bold'><Currency quantity={total} /></span>
                            </h2>
                            <button onClick={createCheckoutSession} role='link' disabled={!session} className={`button mt-2 ${!session && 'from-gradient-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'}`}>
                                {session ? 'Proceed to checkout' : 'Sign in to checkout'}
                            </button>
                        </>
                    )}
                </div>
            </main>
        </div>
    )
}

export default Checkout;