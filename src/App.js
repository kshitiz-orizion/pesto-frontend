import React, { useEffect, useState, useTransition } from "react";
import { NewTodoForm } from "./NewTodoForm";
import "./styles.css";
import { TodoList } from "./TodoList";
import { getTodo, postTodo, deleteTodo, putTodo } from "./api";
import EditTodoForm from "./EditTodoForm";
import { createPortal } from "react-dom";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [isPending, startTransition] = useTransition();
  const [edit, setEdit] = useState(null);

  const getTodoList = async () => {
    const todo = await getTodo();
    setTodos([...todo]);
  };

  useEffect(() => {
    getTodoList();
  }, []);

  const addTodo = async (todoForm) => {
    startTransition(async () => {
      try {
        await postTodo(todoForm);
        setTodos((currentTodos) => {
          return [...currentTodos, todoForm];
        });
      } catch (e) {
        console.log("something went wrong");
      }
    });
  };

  const toggleTodo = (item) => {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo._id === item._id) {
          return { ...item };
        }

        return todo;
      });
    });
  };

  const deleteEachTodo = async (id) => {
    await deleteTodo(id);
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo._id !== id);
    });
  };

  const openEditDialog = (value) => {
    setEdit(value);
  };

  const editTodo = async (id, todoForm) => {
    try {
      const data = await putTodo(id, todoForm);
      setTodos((currentTodos) => {
        return currentTodos.map((todo) => {
          if (todo._id === id) {
            return { ...data };
          }
          return todo;
        });
      });
      startTransition(async () => {
        setEdit(null);
      });
    } catch (e) {
      console.log("something went wrong");
    }
  };

  const closeEditDialog = () => {
    setEdit(null);
  };

  return (
    <>
      <section>
        <NewTodoForm onSubmit={addTodo} />
        <h1 className="header">Todo List</h1>
        {isPending ? (
          <>Loading...</>
        ) : (
          <TodoList
            todos={todos}
            toggleTodo={toggleTodo}
            deleteTodo={deleteEachTodo}
            editTodo={openEditDialog}
          />
        )}
      </section>
      {edit &&
        createPortal(
          <EditTodoForm
            onSubmit={editTodo}
            closeEditDialog={closeEditDialog}
            edit={edit}
          />,
          document.body
        )}
    </>
  );
}
