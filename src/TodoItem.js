import React from "react"
import { getTodo, putTodo } from "./api"

const TodoItem = ({ _id : id, title, toggleTodo, deleteTodo, description, status, index, editTodo }) => {
    const updateTodo = async(value) =>{
      await putTodo(id,{status:value})
      toggleTodo({status:value,title,description,_id:id})
    }
    return (
      <section key={id} className="section">
        <label>
          <span>{index+1}.</span>
          <span>{title} </span>
          <span>{description} </span>
          <select
          value={status}
          onChange={e => updateTodo(e.target.value)}
          >
          <option selected value>Select Status</option>
          <option value="todo">To Do</option>
          <option value="in progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <button className="btn" onClick={()=>editTodo({id,title,description,status})}>Edit</button>
        <button className="btn btn-delete" onClick={()=>deleteTodo(id)}>Delete</button>
        </label>
        </section>
    )
  }

  export default TodoItem