import { useState , useEffect } from 'react'
import './index.css'
import SingleTodo from './SingleTodo';
import ShowAlert from './ShowAlert';


const getLocalStorage = () =>{
  let list=localStorage.getItem('list')
  if(list){
    return (list=JSON.parse(localStorage.getItem('list')))
  }else{
    return []
  }
}


function App() {
  const [ inputText , setInputText ] = useState('')
  const [ todos , setTodos ] = useState(getLocalStorage())
  const [ error , setError ] = useState({bool:false,message:'',type:''})
  const [ isEditing , setIsEditing ] = useState(false)
  const [ editId , setEditId] = useState(null)

  const showError=(bool=false,message='',type='')=>{
    setError({bool,message,type})
  }

  const editTodo=(id)=>{
    let editItem = todos.find((obj)=>{
      return obj.id===id
    })    
    setIsEditing(true)
    setEditId(id)
    setInputText(editItem.title)
  }
  const removeTodo = (id)=>{
    const newTodos = todos.filter((ele)=>{
      return ele.id !== id
    })
    showError(true,'item-removed','danger')
    setTodos(newTodos)
  }

  useEffect(()=>{
    localStorage.setItem('list',JSON.stringify(todos))
  },[todos])

  const handleSubmit = (e) =>{
    e.preventDefault()
    if(!inputText) {
      showError(true,'please enter value','danger')
      return;
    }else if(inputText && isEditing){
      setTodos(
        todos.map((item)=>{
          if(item.id === editId){
            return {...item,title:inputText}
          }
          return item
        })
      )
      setInputText('')
      setEditId(null)
      setIsEditing(false)
      showError(true,'value changed','success')
    }else{
      setTodos((prev)=>{
        showError(true,'item added to the list','success')
        return [...prev,{id:new Date().getTime().toString(),title:inputText}]
      })
      setInputText('')
    }
  }

  return (<>
  <section className="section-center">
    {error.bool && <ShowAlert {...error} items={todos} showErr={showError}/>}
    <h3>todo list</h3>
    <form className='form-container' onSubmit={handleSubmit}>
        <input 
        type="text" 
        placeholder='e.g buy eggs' 
        value={inputText}
        onChange={(e)=>setInputText(e.target.value)}
        />
        <button type='submit' onClick={handleSubmit}>{isEditing?'edit':'submit'}</button>
    </form>
    <section className="todo-list">
      {todos.map((props)=>{
        return <SingleTodo key={props.id} {...props} editTodo={editTodo} removeTodo={removeTodo}/>
      })}
      {todos.length>0&&<button onClick={()=>{
        setTodos([]) 
        showError(true,'empty list','success')
        }} 
        className='clear-all'>clear all</button>}
    </section>
  </section>
  </>)
    
}

export default App
