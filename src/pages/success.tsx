import { CheckCircleIcon } from "@heroicons/react/solid";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { Header } from "../components";

const Success = ({ }) => {

    const router = useRouter()

    return (
        <div className='bg-gray-100 h-screen'>
            <Head>
                <title>Order Confirmation</title>
                <meta name="description" content="Amazon Clone Built By TCS@CORP" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main className='max-w-screen-lg mx-auto'>
                <div className='flex flex-col p-10 bg-white m-4 rounded-lg'>
                    <div className='flex items-center space-x-2 mb-5'>
                        <CheckCircleIcon className='text-green-500 h-12' />
                        <h1 className='text-3xl'>Thank you, your order has been confirmed!</h1>
                    </div>
                    <p>
                        Thank you for shopping with us. We'll send a confirmation once
                        your item has shipped, if you would like to check the status of
                        your order(s), please press the link below.
                    </p>
                    <button onClick={() => router.push('/orders')} className='button mt-8'>Go to my orders</button>
                </div>
            </main>
        </div>
    )
}

export default Success;