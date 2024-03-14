import { CompanyInfoType } from '@/types';
import React from 'react'

async function SSG() {
    const response = await fetch("http://localhost:4000/companyInfo");
    const data:CompanyInfoType = await response.json();

  return (
    <div className='flex flex-col justify-center items-center'>
        <p className='border-2 border-indigo-600 w-80 p-2 text-center font-bold'>{data.name}</p>
        <p className='m-5'>{data.desctiption}</p>
        <img src={data.image} alt="회사 이미지" className="m-5" />
    </div>
  )
}

export default SSG