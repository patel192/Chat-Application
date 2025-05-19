
import './App.css'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Navbar from './Components/Navbar';


function App() {
  const {register,handleSubmit}= useForm();
  const [obj, setobj] = useState({name:"",age:"",income:"",gender:""})
  const SubmitHandler = (data) => {
    setobj(data)
    console.log(obj)
  }
  const [show, setshow] = useState(true)
  const handleToggle = () =>{
    setshow(!show)
  }
  return (
    <>
    <form action="" onSubmit={handleSubmit(SubmitHandler)}>

    <input type="text" placeholder='Name' {...register("name")} />
    <input type="text" placeholder='Age' {...register("age")} />
    <input type="text" placeholder='Income' {...register("income")} />
    <input type="text" placeholder='Gender' {...register("gender")} />
    <input type="submit" value="submit" />
    </form>
    <button onClick={handleToggle} type='button'>Toggle</button>
    {show ? <Navbar text={obj}/> : null}
    </>
  )
}

export default App
