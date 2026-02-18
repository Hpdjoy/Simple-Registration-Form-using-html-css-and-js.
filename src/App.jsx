import { useState } from 'react'
import axios from 'axios';
import './App.css'


function App() {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  // console.log("API URL:", API_URL);
  const [userDeatils, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [users, setUsers] = useState({
    data: []
  });
  const [showDetails, setShowDetails] = useState(false);

  const handleChange = (e) => {
    setUserDetails({
      ...userDeatils,
      [e.target.name]: e.target.value
    })
  };
  const handleShowDetails = async () => {
    // console.log(userDeatils);
    setShowDetails(!showDetails);
    try {
      const response = await axios.get(`${API_URL}/getusers`);
      console.log("Users data:", response.data);
      setUsers({ data: response.data.users });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  const handleSubmit = async (e) => {

    if (userDeatils.name == "") {
      alert("Name is required!");
      return;
    }
    if (userDeatils.email == "") {
      alert("Email is required!");
      return;
    }
    if (userDeatils.password == "") {
      alert("Password is required!");
      return;
    }
    if (userDeatils.confirmPassword == "") {
      alert("Confirm Password is required!");
      return;
    }

    if (userDeatils.password !== userDeatils.confirmPassword) {
      alert("Password and Confirm Password do not match!");
      return;
    }
    await axios.post(`${API_URL}/register`, userDeatils)
    e.preventDefault();
    console.log(userDeatils);

  }




  return (
    <div className="App">
      <div className='form-header'>Registration Form</div>

      <form onSubmit={handleSubmit} className='form-container'>

        <label htmlFor="name">Name:</label>
        <input type="text" id="name"
          placeholder="Enter your name"
          name="name"
          onChange={handleChange} />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email"
          placeholder="Enter your email"
          name="email"
          onChange={handleChange} />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password"
          placeholder="Enter your password"
          name="password"
          onChange={handleChange} />


        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword"
          placeholder='Enter confirm Password'
          name="confirmPassword"
          onChange={handleChange} />
        <input type="submit" />
      </form>


      <button onClick={() => handleShowDetails()}>{showDetails ? "Hide Details" : "Show Details"}</button>
      <div>
        {showDetails && <h2>Current User Details:</h2>}
        {showDetails && users.data.map((user) => {
          
          return (
            <>
            <div key={user._id}>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
            </div>
            </>
          );
        })}


      </div>
    </div>
  )
}




export default App
