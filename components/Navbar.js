import React from 'react'
import Link from 'next/link'

const Navbar = () => {
    return (
        <nav className='py-3 bg-sky-700 border-b shadow sticky top-0 z-50'>
            <div className='container max-w-7xl mx-auto px-8'>
                <Link href={'/'}>
                    <a className='text-lg text-gray-200 font-bold hover:text-gray-100'>Mitramas Customer App</a>
                </Link>
            </div>
        </nav>
    )
}

export default Navbar