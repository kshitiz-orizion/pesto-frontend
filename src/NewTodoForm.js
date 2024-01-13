import React,{ useState, useTransition } from "react";

export function NewTodoForm({ onSubmit, edit, type, closeEditDialog }) {
  const editTodoForm = type === "edit"
  const [newItem, setNewItem] = useState({
    title: editTodoForm ?edit.title : '',
    description : editTodoForm ? edit?.description : '',
    status: editTodoForm ? edit?.status : ''});

    const [isPending,startTransition] = useTransition()

  const [error,setError] = useState({
    title: '',
    description:'',
    status:''
  })
  const setValue = async(value,field) => {
    const item ={...newItem};
    item[field] = value;
    setNewItem({...item})
    startTransition(()=>{
      setError({field:''})
    })
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()
    if (!newItem.title || !newItem.status) return
    if(editTodoForm){
      onSubmit(edit.id,newItem)
    }
    else{
      onSubmit(newItem)
    }

    setNewItem({title:'', description:'',status:''})
  }

  const blurInput = async (type="all") =>{
    if(!newItem.title && type==="title"){
      setError({title:'Title is required'})
      return false
    } 
    else if(newItem.description.length > 10 && type === "description"){
      setError({description:'Max Length is 10'})
      return false
    }
    else if(!newItem.status && type ==="status"){
      setError({status:'Status is required'})
      return false
    }
    else return true
    
  }

  return (
    <>
    <form onSubmit={handleSubmit} className="new-item-form">
      <div className="form-row">
        <label htmlFor="item">{edit?.title? "Edit Item" : "New Item"}</label>
        <input
          value={newItem.title}
          onChange={e => setValue(e.target.value,"title")}
          type="text"
          id="item"
          placeholder="title(max 10 characters)"
          maxLength={10}
          onBlur={() =>blurInput("title")}
        />
        {error.title  && <span>{error.title}</span>}
         <input
          value={newItem.description}
          onChange={e => setValue(e.target.value,"description")}
          type="text"
          placeholder="description(max 10 characters)"
          id="description"
          maxLength={10}
          onBlur={() =>blurInput("description")}
        />
        {error.description  && <span>{error.description}</span>}
         <select
          value={newItem.status}
          onChange={e => setValue(e.target.value,"status")}
          type="text"
          id="status"
          onBlur={() =>blurInput("status")}
          className="placeholder-select"
          style={{color: !newItem.status ? '#a1a1a1' : ''}}
        >
          <option selected value='' disabled >Select Status(required)</option>
          <option  value="todo">To Do</option>
          <option  value="in progress">In Progress</option>
          <option  value="done">Done</option>
        </select>
        {error.status  && <span>{error.status}</span>}
      </div>
      <button className="btn">{editTodoForm ? "Edit" : "Add"}</button>
    </form>
    <div className="form-row back">
    {editTodoForm && <button  onClick={()=>closeEditDialog()}className="btn btn-delete">Back</button>}
    </div>
    </>
  )
}