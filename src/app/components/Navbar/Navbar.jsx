"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const isActive = (path) => pathname === path ? 'text-[#5857B0]' : 'text-white';

  return (
    <nav className='bg-black table-fixed top-0 end-0 start-0 text-white w-full'>
      <div className="pt-3 pl-3 flex flex-col lg:justify-between lg:flex-row lg:items-center">
        <div className="links flex flex-col lg:flex-row lg:items-center gap-1">
          <h3 className='text-white font-extrabold text-2xl'>
            Stream <span className='text-[#5857B0] font-extrabold'>Movies</span>
          </h3>
          <ul className='flex flex-col lg:flex-row'>
            <li className='font-semibold text-xl px-2 py-2'>
              <Link href="/" className={isActive('/')}>Home</Link>
            </li>
            <li className='font-semibold text-xl px-2 py-2'>
              <Link href="/tv" className={isActive('/tv')}>TV</Link>
            </li>
            <li className='font-semibold text-xl px-2 py-2'>
              <Link href="/ssr" className={isActive('/ssr')}>Airing SSR</Link>
            </li>
            <li className='font-semibold text-xl px-2 py-2'>
              <Link href="/isr" className={isActive('/isr')}>Popular ISR</Link>
            </li>
            <li className='font-semibold text-xl px-2 py-2'>
              <Link href="/ssg" className={isActive('/ssg')}>Top Rated SSG</Link>
            </li>
          </ul>
        </div>
        <div className="">
          <ul className='flex flex-col lg:flex-row lg:items-center'>
            <form onSubmit={handleSearch} className="flex items-center mb-2 mr-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies..."
                className="px-4 py-2 rounded-l-lg text-black"
              />
              <button
                type="submit"
                className="bg-[#5857B0] text-white px-4 py-2 rounded-r-lg hover:bg-[#5827B0]"
              >
                Search
              </button>
            </form>
            <Link href="/login">
              <button className="mr-5 mb-2 text-white font-semibold bg-[#5857B0] rounded-lg text-xl px-8 py-2 hover:bg-[#5827B0]">Login</button>
            </Link>
            <Link href="/register">
              <button className="mr-5 mb-2 text-white font-semibold bg-[#5857B0] rounded-lg text-xl px-5 py-2 hover:bg-[#5827B0]">Register</button>
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
}
