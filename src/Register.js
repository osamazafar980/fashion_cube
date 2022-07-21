import React, { useEffect, useState } from "react";
import "./Register.css";
import { TextField,Avatar } from "@mui/material";
import {  useNavigate } from "react-router-dom";

function Register(event) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  async function register(){
    if (name==""){
      alert("Name Required");
    }else if (email==""){
      alert("Email Required");
    }else if (password==""){
      alert("Password Required");
    }else{
        const response = await fetch('http://localhost:1337/api/register',{
            method:'POST',
            headers:{
                'Content-Type' : 'application/json',
            },
            body:JSON.stringify({
                name,
                email,
                password,
            })
        })

        const data = await response.json()
        console.log(data)

    }
  };
  return (
    <div className="register">
    <div className="registerBox">
    <div className="registerL">
        <h1>Wellcome To Fashion Cube</h1>
        <h4>A world class clothing store for anyone, anywhere. </h4>
        <h4>By signing up for Fashion Cube account, you agree to our Terms of use and Privacy Policy.</h4>
      </div>
      <div className="registerR">
      <div className="register__container">
      <TextField id="filled-basic" 
        label="Full Name" variant="filled" 
        className="register__textBox"
        value={name}
        onChange={(e) => setName(e.target.value)}
        />
        <TextField id="filled-basic" 
        label="E-mail Address" variant="filled" 
        className="register__textBox"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        <TextField id="filled-basic" label="Password" 
        type="password" variant="filled"   
        className="register__textBox"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
        <button className="register__btn" onClick={register}>
          Register
        </button>
        <div className="forgotPass">
        <p onClick={()=>{navigate("/login")}}>Login an account</p>
        </div>
      </div>
      </div>
      </div>
      </div>
  );
}
export default Register;