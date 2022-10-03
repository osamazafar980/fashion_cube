import React,{useEffect,useState} from 'react'
import { Avatar,TextField } from "@mui/material";
import { Link, useNavigate,useParams } from "react-router-dom";
import './Profile.css'
export default function Profile() {
    const [newPassword, setNewPassword] = useState("");
    const [name, setName] = useState("");
    const navigate = useNavigate();
    var {username,email} = useParams();
    useEffect(()=>{
        setName(username)
        setNewPassword("")
    },[])
    async function updateInfo(){
        if(newPassword.length==0){
            const response = await fetch('http://localhost:1337/api/updateUserName',{
            method:'POST',
            headers:{
                'Content-Type' : 'application/json',
            },
            body:JSON.stringify({
                name,
                email
            })
            })

            const data = await response.json()
            if(data.status=='OK'){
                navigate('/dashboard/'+name+'/'+email)
                alert('User Information Updated!')
            }else{
                console.log(data.status)
            }
        }
        else{
            const response = await fetch('http://localhost:1337/api/updateUserInfo',{
            method:'POST',
            headers:{
                'Content-Type' : 'application/json',
            },
            body:JSON.stringify({
                name,
                email,
                password:newPassword
            })
            })

            const data = await response.json()
            if(data.status=='OK'){
                navigate('/dashboard/'+name+'/'+email)
                alert('User Information Updated!')
            }else{
                console.log(data.status)
            }
        }
    }
  return (
    <div className='dashboard'>
        <div className='navBar'>
            <h1>Fashion Cube Store</h1>
        </div>
        <div className='profileBody'>
            <div id='profileInputDiv'>
                <p>User Name:</p>
                <TextField id="filled-basic"
                    InputLabelProps={{
                        style: { color: '#fff'}, 
                    }}    
                    label="User Name" variant="filled" 
                    className="login__textBox"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div id='profileInputDiv'>
                <p>Email:</p>
                <TextField id="filled-basic" 
                    InputLabelProps={{
                        style: { color: '#fff'}, 
                    }}
                    label="E-mail Address" variant="filled" 
                    className="login__textBox"
                    value={email}
                    contentEditable={false}
                />
            </div>
            <div id='profileInputDiv'>
                <p>New Password:</p>
                <TextField id="filled-basic" 
                    InputLabelProps={{
                        style: { color: '#fff'}, 
                    }}
                    label="New Password" variant="filled" 
                    className="login__textBox"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </div>
            <p id='cCheckOut'
                    onClick={updateInfo}
                >Update Information</p>
        </div>
        <div id='footer'>
            <p>All rights are reserved by Fashion Cube. 2022</p>
        </div>
    </div>
  )
}
