import { TodoType } from '@/types';
import React from 'react'

async function ISR() {
  const response = await fetch(`http://localhost:4000/todos`, {
    next: {
      revalidate: 10,
    },
  });
  const data = await response.json();
  const todoLength = data.length;
  const workingLength = data.filter((prev:TodoType) => prev.isDone === false).length;
  const doneLength = data.filter((prev:TodoType) => prev.isDone === true).length;

  return (
    <div className='flex flex-col justify-center items-center'>
      <h2>{`현재까지 ${todoLength}개의 todolist가 등록되었습니다.`}</h2>
      <p>{`현재까지 ${doneLength}개의 완료 리스트, ${workingLength}개의 할일 리스트가 존재합니다.`}</p>
    </div>
  )
}

export default ISR

