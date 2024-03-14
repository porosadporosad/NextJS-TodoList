import Link from 'next/link'
import React from 'react'

function Nav() {
  return (
    <div className='flex justify-center gap-4 m-5 font-bold'>
        <Link href="/">Home</Link>
        <Link href={"/about"}>SSG</Link>
        <Link href={"/report"}>할일정보통계보러가기</Link>
        <Link href={"/todos-csr"}>CSR</Link>
        <Link href={"/todos-ssr"}>SSR</Link>
    </div>
  )
}

export default Nav