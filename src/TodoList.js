import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { getTodo } from "./api";
import TableHeading from "./TableHeading";

export function TodoList({ toggleTodo, deleteTodo, todos, editTodo }) {
  return (
    <ul className="list">
      {todos.length === 0 && "No Todos"}
      <TableHeading/>
      {todos.map((todo, index) => {
        return (
          <>
            <TodoItem
              {...todo}
              key={todo._id}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
              index={index}
              editTodo={editTodo}
            />
          </>
        );
      })}
    </ul>
  );
}
