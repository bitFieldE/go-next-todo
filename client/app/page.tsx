"use server"
import React from 'react';
import { getAllTodos } from './api/todo';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';

export default async function Home() {
  const todos = await getAllTodos()

  return (
    <>
      <AddTodo />
      {todos && (
        <TodoList todos={todos}/>
      )}
    </>
  );
};
