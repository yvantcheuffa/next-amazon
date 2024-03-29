import moment from "moment";
import { getSession, useSession } from "next-auth/client";
import Head from "next/head";
import React from "react";
import db from "../../firebase";
import { Header, Order } from "../components";

const Orders = ({ orders }) => {

    const session = useSession()

    return (
        <div>
            <Head>
                <title>Orders</title>
                <meta name="description" content="Amazon Clone Built By TCS@CORP" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main className='max-w-screen-lg mx-auto p-10'>
                <h1 className='text-3xl border-b mb-2 pb-1 border-yellow-400'>Your Orders</h1>
                {session ?
                    <h2>
                        {orders ? orders.length : 0} Order(s)
                    </h2> : <h2>Please sign in to see your orders</h2>}
                <div className='mt-5 space-y-4'>
                    {orders?.map(({ id, amount, amountShipping, items, timestamp, images }) => (
                        <Order
                            key={id}
                            id={id}
                            amount={amount}
                            amountShipping={amountShipping}
                            items={items}
                            timestamp={timestamp}
                            images={images}
                        />
                    ))}
                </div>
            </main>
        </div>
    )
}

export default Orders;

export const getServerSideProps = async (context) => {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

    // Get the user logged in credentials
    const session: any = await getSession(context);
    if (!session) return { props: {} }

    // Firebase DB
    const stripeOrders = await db
        .collection('users')
        .doc(session.user.email)
        .collection('orders')
        .orderBy('timestamp', 'desc')
        .get()

    // Stripe orders
    const orders = await Promise.all(
        stripeOrders.docs.map(async (order) => ({
            id: order.id,
            amount: order.data().amount,
            amountShipping: order.data().amount_shipping,
            images: order.data().images,
            timestamp: moment(order.data().timestamp.toDate()).unix(),
            items: (
                await stripe.checkout.sessions.listLineItems(order.id, {
                    limit: 100,
                })
            ).data,
        }))
    )

    return {
        props: {
            orders,
            session
        }
    }
}