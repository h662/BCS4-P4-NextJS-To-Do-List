"use client";

import { Todo } from "@prisma/client";
import { NextPage } from "next";
import { useState } from "react";
import CreateTodo from "./components/CreateTodo";

const Home: NextPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  return (
    <div className="container">
      <CreateTodo todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default Home;
