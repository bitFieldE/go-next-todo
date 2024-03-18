"use client"
import React, { useState } from "react";
import { Todo } from "../types/todo";
import { deleteTodo, updateTodo } from "../api/todo";
import { useRouter } from "next/navigation";

interface TodoProps {
  todo: Todo;
}

const TodoCard = ({todo}: TodoProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTaskTitle, setEditedTaskTitle] = useState(todo.content);
  const router = useRouter();

  const handleDelete = async () => {
    await deleteTodo(todo.id)
    router.refresh();
  }

  const handleEdit = async () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    await updateTodo(todo.id, editedTaskTitle);
    setIsEditing(false);
    router.refresh();
  };

  return (
    <li key={todo.id} className="item">
      {isEditing ? (
        <input
          type="text"
          value={editedTaskTitle}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEditedTaskTitle(e.target.value)
          }
        />
      ) : (<span>{todo.content}</span>)}
      <div>
        {isEditing ? (
          <button className="text-green-500 mr-3" onClick={handleSave}>SAVE</button>
        ) : (
          <button className="text-green-500 mr-3" onClick={handleEdit}>EDIT</button>
        )}
        <button className="text-red-500" onClick={handleDelete}>DELETE</button>
      </div>
    </li>
  )
}

export default TodoCard;