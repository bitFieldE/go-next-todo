import { Todo } from '../types/todo'

export const getAllTodos = async (): Promise<Todo[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_LOCALHOST_URL}/api/v1/todos`, {
    cache: 'no-store',
  });
  const data = await response.json();
  const todos: Todo[] = await data.todos;
  
  return todos;
};

export const getTodo = async(id: string): Promise<Todo> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/todos/${id}`, {
    method: 'GET',
    cache: "no-store",
  });

  const todo = await response.json();
  return todo;
};

export const addTodo = async (content: string): Promise<Todo> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/todos`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({content: content}),
  })
  const todo: Todo = await response.json()

  return todo
};

export const updateTodo = async (id: string, content: string): Promise<Todo> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/todos/${id}`,{
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({content: content}),
  })
  const todo: Todo = await response.json()

  return todo
};

export const deleteTodo = async (id: string): Promise<void> => {
  await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/todos/${id}`,{
    method: "DELETE",
    cache: "no-store",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({id: id}),
  })
};
