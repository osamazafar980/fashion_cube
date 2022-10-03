import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { Avatar,TextField } from "@mui/material";

async function login(email,password){
  if (email==""){
    alert("Email Required");
  }else if (password==""){
    alert("Password Required");
  }else{
      const response = await fetch('http://localhost:1337/api/login',{
          method:'POST',
          headers:{
              'Content-Type' : 'application/json',
          },
          body:JSON.stringify({
              email,
              password,
          })
      })

      const data = await response.json()
      return data

  }
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="login">
      <div className="loginBox">
      <div className="loginL">
        <h1>Wellcome To Fashion Cube</h1>
        <h4>Good to see you again! Please Login.</h4>
        <h4>By logging into Fashion Cube store, you agree to our Terms of use and Privacy Policy.</h4>
      </div>
      <div className="loginR">

      <div className="login__container">
        <TextField id="filled-basic" 
        label="E-mail Address" variant="filled" 
        className="login__textBox"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        <div><p></p></div>
        <TextField id="filled-basic" label="Password" 
        type="password" variant="filled"   
        className="login__textBox"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />

       
        <button
          className="login__btn"
          onClick={async () => {
            if (email==""){
              alert("Email Required");
            }else if (password==""){
              alert("Password Required");
            }else{  
            const data = await login(email, password)
            if(data.status == 'OK'){
              navigate('/dashboard/'+data.username+'/'+data.email)
            }else{
              alert('Wrong Credentials')
              console.log(data)
            }
            }
          }}
        >
          Login
        </button>
        
        <div className="forgotPass">
          <p onClick={()=>{navigate("/adminLogin")}}>Login As Administrator</p>
        </div>
        
        
        <div className="orDivider">
          <p >OR</p>
        </div>

        <div className="forgotPass">
          <p onClick={()=>{navigate("/")}}>Create an account</p>
        </div>
      </div>

      </div>
      </div>
      </div>
  );
}
export default Login;