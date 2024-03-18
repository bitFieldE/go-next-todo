"use client"

import { addTodo } from "../api/todo";
import React, {ChangeEvent ,FormEvent, useState} from "react";
import { useRouter } from "next/navigation";

const AddTodo = () => {
  const [todoTitle, setTodoTitle] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  
    await addTodo(todoTitle);
    setTodoTitle("");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        onChange={(e: ChangeEvent<HTMLInputElement>)=>{
          setTodoTitle(e.target.value)
        }}
        value={todoTitle}
      />
      <button type="submit">作成</button>
    </form>
  )
}

export default AddTodo;