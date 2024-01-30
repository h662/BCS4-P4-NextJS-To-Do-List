import { Todo } from "@prisma/client";
import axios from "axios";
import { FC, useState } from "react";

interface TodoCardProps {
  todo: Todo;
}

const TodoCard: FC<TodoCardProps> = ({ todo }) => {
  const [isDone, setIsDone] = useState<boolean>(todo.isDone);

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

  return (
    <li className="mx-8 text-right">
      <button className={`${isDone && "line-through"}`} onClick={onIsDoneTodo}>
        {todo.content}
      </button>{" "}
      <button className="btn-style">수정</button>{" "}
      <button className="btn-style">삭제</button>
    </li>
  );
};

export default TodoCard;
