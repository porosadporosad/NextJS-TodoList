import { TodoType } from '@/types';
import React from 'react'

async function SSR() {
  const response = await fetch("http://localhost:4000/todos", {
    cache: "no-cache",
  });
  const todos  = await response.json();
  return (
    <div className='flex flex-col justify-center items-center'>
      {todos.map((prev:TodoType)=> {
        return(<div key={prev.id} className='bg-blue-100 border border-blue-400 text-blue-700 p-8 m-2 rounded w-72'>
           <div>{prev.title}</div>
            <div>{prev.contents}</div>
        </div>)
      })}
    </div>
  )
}

export default SSR
