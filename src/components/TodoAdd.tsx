"use client";

import { NewTodo } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { FormEvent, useState } from 'react'

function TodoAdd() {
    const queryClient = useQueryClient();
      const [title,setTitle] = useState<string>("");
      const [contents,setContents] = useState<string>("");

      const newTodoMutation = useMutation({
        mutationFn: async (newTodo: NewTodo) => {
          const response = await fetch(`http://localhost:3000/api/todos`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newTodo),
          });
          const todo = await response.json();
          return todo;
        },
      });

      const todoTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
      };

      const todoContent = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContents(e.target.value);
      };

      const todoSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        newTodoMutation.mutate(
          { title, contents  },
          {
            onSuccess: () => {
              setTitle("");
              setContents("");

              queryClient.invalidateQueries({
                queryKey: ["todos"],
              });
            },
          }
        );
      };
  return (
    <div className='flex justify-center items-center'>
        <form className='flex gap-1' onSubmit={todoSubmit}>
            <input className='border' type='text' placeholder='제목' value={title} required maxLength={10} onChange={todoTitle}/>
            <input className='border' type='text' placeholder='내용' value={contents} required maxLength={20} onChange={todoContent} />
            <button type='submit'>추가하기</button>
      </form>
    </div>
  )
}

export default TodoAdd