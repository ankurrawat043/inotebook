import React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";


export default function Login(props) {
  const host = "http://localhost:5000";
    const [credentials, setCredentials] = useState({email:"", password:""});
    let navigate = useNavigate();
    

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
               },
               body: JSON.stringify({email:credentials.email, password:credentials.password}),
        });
        const json = await response.json();
          console.log(json);
          if(json.success){
            //Save the authToken and redirect
            localStorage.setItem("token", json.authtoken);
            navigate("/");
            props.showAlert("Logged Successfully","success");
          }else{
            props.showAlert("Invalid Credentials","danger");
          }

    }
  return (
    <div>
    <h1>Login to continue to iNotebook</h1>
      <form onSubmit={handleSubmit} >
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" autoComplete='user-name ' value={credentials.email} onChange={onChange} id="email" name='email' aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" autoComplete='current-password' value={credentials.password} onChange={onChange} id="password" name='password'/>
  </div>
  
  <button type="submit" className="btn btn-primary"  >Submit</button>
</form>
    </div>
  )
}
