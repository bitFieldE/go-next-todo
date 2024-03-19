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
    <form className="mb-4 space-y-3" onSubmit={handleSubmit}>
      <input
        type="text"
        className="w-full border px-4 py-2 rounded-lg focus:border-blue-400"
        onChange={(e: ChangeEvent<HTMLInputElement>)=>{
          setTodoTitle(e.target.value)
        }}
        value={todoTitle}
      />
      <button className="w-full px-4 py-2 text-white bg-blue-500 rounded transform hover:bg-blue-400 hover:scale-95 duration-200" type="submit">
        作成
      </button>
    </form>
  )
}

export default AddTodo;