"use server"
import React from 'react';
import { getAllTodos } from './api/todo';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';

export default async function Home() {
  const todos = await getAllTodos()

  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-200">
      <h1 className="text-4xl font-bold text-grey-700 mt-32">To Do App</h1>
      <div className="w-full max-w-xl mt-5">
        <div className="w-full px-8 py-6 bg-white shadow-md rounded-lg">
          <AddTodo />
          {todos && (
            <TodoList todos={todos}/>
          )}
        </div>
      </div>
    </main>
  );
};
