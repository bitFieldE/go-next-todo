"use client"
import React from "react";
import { Todo } from "../types/todo";
import { deleteTodo, getTodo } from "../api/todo";
import { useRouter } from "next/navigation";

interface TodoProps {
  todo: Todo;
}

const TodoCard = ({todo}: TodoProps) => {
  const router = useRouter();

  const handleDelete = async () => {
    await deleteTodo(todo.id)
    router.refresh();
  }

  const handleEdit = async () => {
    const data = await getTodo(todo.id)
    console.log(data)
  }

  return (
    <li key={todo.id} className="item">
      <span>{todo.content}</span>
      <div>
        <button onClick={handleEdit}>EDIT</button>
        <button onClick={handleDelete}>DELETE</button>
      </div>
    </li>
  )
}

export default TodoCard;