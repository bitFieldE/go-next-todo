"use client"
import React, { useRef, useState, useEffect } from "react";
import { Todo } from "../types/todo";
import { deleteTodo, updateTodo } from "../api/todo";
import { useRouter } from "next/navigation";

interface TodoProps {
  todo: Todo;
}

const TodoCard = ({todo}: TodoProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTaskTitle, setEditedTaskTitle] = useState(todo.content);
  const router = useRouter();

  useEffect(() => {
    if(isEditing) {
      ref.current?.focus();
    }
  }, [isEditing]);

  const handleDelete = async () => {
    await deleteTodo(todo.id)
    router.refresh();
  };

  const handleEdit = async () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    await updateTodo(todo.id, editedTaskTitle);
    setIsEditing(false);
    router.refresh();
  };

  return (
    <li
      key={todo.id}
      className="flex justify-between p-4 bg-white border-l-4 border-blue-500 rounded shadow"
    >
      {isEditing ? (
        <input
        ref={ref}
          type="text"
          className="mr-2 py-1 px-2 rounded border-gray-400 border"
          value={editedTaskTitle}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEditedTaskTitle(e.target.value)
          }
        />
      ) : (<span>{todo.content}</span>)}
      <div>
        {isEditing ? (
          <button className="text-blue-500 mr-3" onClick={handleSave}>SAVE</button>
        ) : (
          <button className="text-green-500 mr-3" onClick={handleEdit}>EDIT</button>
        )}
        <button className="text-red-500" onClick={handleDelete}>DELETE</button>
      </div>
    </li>
  )
}

export default TodoCard;