import React,{ useState } from "react"
import { NewTodoForm } from "./NewTodoForm";

const EditTodoForm =({edit, onSubmit, closeEditDialog}) =>{
    return(
      <div  className="confirm-pop-up" style={{height:`${document.body.clientHeight}px`}}>
        <div className="edit-form">
        <NewTodoForm type="edit" edit={edit} onSubmit={onSubmit} closeEditDialog={closeEditDialog}/>
        </div>
      </div>

    )
}

export default EditTodoForm