"use client";

import { TodoType } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react'

function TodoList({bool}: {bool: boolean}) {
    const {
        data: todos,
        isLoading,
        isError,
      } = useQuery({
        queryKey: ["todos"],
        queryFn: async () => {
          const response = await fetch(`http://localhost:3000/api/todos`);
            const {todos} = await response.json();
          return todos;
        },
      });

      const queryClient = useQueryClient();

      const todoDelMutation = useMutation({
        mutationFn: async (id: string) => {
          const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["todos"],
            });
          },
      });

    const todoDel = (id: string) => {
        const real = window.confirm('정말 삭제하시겠습니까?');
        if(real){
            todoDelMutation.mutate(id);
        } else {
            return;
        }
    }

    // 안됨
    const todoChangeMutation = useMutation({
        mutationFn: async (todo:TodoType) => {
          const response = await fetch(`http://localhost:3000/api/todos/${todo.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ isDone: !todo.isDone }),
          });
        const updatedTodo = await response.json();
        return updatedTodo;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["todos"],
            });
          },
      });

    const todoChange  = (prev: TodoType) => {
        todoChangeMutation.mutate(prev);
    }

    if(isLoading){
        return <div>Loading...</div>;
    }

    if(isError){
        return <div>Error</div>;
    }
  return (
    <div>
      <h2>{bool ? 'Working..🔥' : 'Done..!🎉'}</h2>
      {todos.filter((item:TodoType) => {
            return item.isDone === bool;
          }).map((prev:TodoType)=> {
        return(
            <div key={prev.id} className='bg-blue-100 border border-blue-400 text-blue-700 p-8 m-2 rounded w-72'>
              <div>{prev.title}</div>
              <div>{prev.contents}</div>
              <div className='flex gap-1'>
                <button onClick={()=>todoDel(prev.id)}>삭제</button>
                <button onClick={()=>todoChange(prev)}>{bool ? '완료' : '취소'}</button>
              </div>
            </div>
        )
    })}</div>
  )
}

export default TodoList