import { Todo } from "@prisma/client";
import axios from "axios";
import { FC, FormEvent, useState } from "react";

interface TodoCardProps {
  todo: Todo;
}

const TodoCard: FC<TodoCardProps> = ({ todo }) => {
  const [isDone, setIsDone] = useState<boolean>(todo.isDone);
  const [content, setContent] = useState<string>(todo.content);
  const [toggle, setToggle] = useState<boolean>(false);
  const [updateTodo, setUpdateTodo] = useState<string>(todo.content);

  const onIsDoneTodo = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      await axios.put<Todo>(
        `${process.env.NEXT_PUBLIC_URL}/api/todo/${todo.id}/is-done`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsDone(!isDone);
    } catch (error) {
      console.error(error);
    }
  };

  const onUpdateTodo = async (e: FormEvent) => {
    try {
      e.preventDefault();

      const token = localStorage.getItem("token");

      if (!token) return;

      const response = await axios.put<Todo>(
        `${process.env.NEXT_PUBLIC_URL}/api/todo/${todo.id}`,
        {
          content: updateTodo,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setContent(response.data.content);
      setToggle(false);
    } catch (error) {
      console.error(error);

      setToggle(false);
    }
  };

  return (
    <li className="mx-8 flex justify-end">
      {toggle ? (
        <form className="flex" onSubmit={onUpdateTodo}>
          <input
            className="input-style"
            type="text"
            value={updateTodo}
            onChange={(e) => setUpdateTodo(e.target.value)}
          />
          <input className="btn-style ml-2" type="submit" value="Edit" />
        </form>
      ) : (
        <button
          className={`${isDone && "line-through"}`}
          onClick={onIsDoneTodo}
        >
          {content}
        </button>
      )}
      <button className="btn-style mx-2" onClick={() => setToggle(!toggle)}>
        {toggle ? "Cancel" : "Edit"}
      </button>
      <button className="btn-style">Delete</button>
    </li>
  );
};

export default TodoCard;
