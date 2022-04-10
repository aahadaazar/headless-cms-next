import Head from 'next/head';
import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>NextJS Blog</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className='flex flex-col min-h-screen'>
        <header className='bg-sky-900 py-4'>
          <div className=' text-blue-50 container mx-auto flex justify-center'>
            <Link href='/'>
              <a>👾 Home</a>
            </Link>
            <span className='mx-auto'>A NextJS Blog</span>{' '}
            <Link href='/contentful/blogs'>
              <a>Contentful Blogs 🤖</a>
            </Link>
          </div>
        </header>
        <main className='bg-slate-300 py-6 px-5 flex-1'>{children}</main>
        <footer className='bg-sky-900 py-4'>
          <div className='container mx-auto flex justify-center text-blue-50'>
            &copy; Aahad Aazar
          </div>
        </footer>
      </div>
    </>
  );
}