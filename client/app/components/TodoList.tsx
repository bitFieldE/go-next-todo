
import { Todo } from "../types/todo";
import React from "react";
import TodoCard from "./TodoCard";

interface TodoListProps {
  todos: Todo[];
}

const TodoList = ({todos}: TodoListProps) => {
  return (
    <ul className="space-y-3">
      {todos.map((todo) => (
        <TodoCard key={todo.id} todo={todo} />
      ))}
    </ul>
  )
}

export default TodoList;