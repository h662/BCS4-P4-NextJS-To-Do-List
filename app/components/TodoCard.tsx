import { Todo } from "@prisma/client";
import { FC } from "react";

interface TodoCardProps {
  todo: Todo;
}

const TodoCard: FC<TodoCardProps> = ({ todo }) => {
  return (
    <li className="mx-8 text-right">
      <button>{todo.content}</button>{" "}
      <button className="btn-style">수정</button>{" "}
      <button className="btn-style">삭제</button>
    </li>
  );
};

export default TodoCard;
