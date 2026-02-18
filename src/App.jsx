import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const [userDeatils, setUserDetails] = useState({
    name: "",
    email: "",
    password: ""
  });



  const handleChange = (e) => {
    setUserDetails({
      ...userDeatils,
      [e.target.name]: e.target.value
    })
  };

  const handleSubmit = (e) => {
        e.preventDefault();
        console.log(userDeatils);
  }


  



  return (
    <>
    <div className='form-header'>Registration Form</div>

     <form onSubmit={handleSubmit}
      className='form-container'>
      <label htmlFor="name">Name:</label>
      <input type="text"
      placeholder="Enter your name"
      name="name"
      onChange={handleChange} />

      <label htmlFor="email">Email:</label>
      <input type="email" 
      placeholder="Enter your email" 
      name="email" 
      onChange={handleChange} />

      <label htmlFor="password">Password:</label>
      <input type="password"
      placeholder="Enter your password" 
      name="password" 
      onChange={handleChange} />

      <input type="submit"/>
     </form>
    
    </>
  )
}




export default App
