"use client";

import TodoAdd from '@/components/TodoAdd';
import TodoList from '@/components/TodoList';
import React from 'react'

function CSR() {

  return (
    <div>
      <TodoAdd />
      <TodoList bool={false} />
      <TodoList bool={true} />
    </div>
  )
}

export default CSR