import React from "react";
import { FaEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai'

const SingleTodo=({id , title ,removeTodo,editTodo})=>{
    return (
    <article key={id} className="single-todo">
        <p>{title}</p>
        <div className="btns">
            <FaEdit 
            className="edit-icon"
            onClick={()=>editTodo(id)}
            />
            <AiFillDelete 
            className="delete-icon"
            onClick={()=>removeTodo(id)}
            />
        </div>
    </article>
    )
}
export default SingleTodo
