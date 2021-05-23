import Head from 'next/head';

import { Header, Banner, ProductFeed } from '../components'
import { ProductType } from '../components/Product';

export default function Home({ products }) {
  return (
    <div className='bg-gray-100'>
      <Head>
        <title>Amazon 2.0</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Header */}
      <Header />
      <main className='max-w-screen-2xl mx-auto'>
        {/* Banner */}
        <Banner />
        {/* Product Feed */}
        <ProductFeed products={products} />
      </main>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  const products: ProductType[] = await fetch('https://fakestoreapi.com/products')
    .then((res) => res.json())
    .catch((err) => console.log(err));
  return {
    props: {
      products: products
    }
  }
}