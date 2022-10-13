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
            <div id="bankingLogos">
                <img src='https://princecard.com/wp-content/uploads/2020/08/ebuy-easypaisa-logo.png'/>
                <img src='https://seeklogo.com/images/J/jazz-cash-logo-829841352F-seeklogo.com.jpg'/>
                <img src='https://www.kindpng.com/picc/m/35-351793_credit-or-debit-card-mastercard-logo-visa-card.png'/>
                <img src="https://st2.depositphotos.com/1031343/6862/v/950/depositphotos_68629709-stock-illustration-cash-on-delivery-label-sticker.jpg"/>
            </div>
            <div id="bankingInfo">
                <p>Easypaisa & Jazz Cash Account: 0300-9614255</p>
            </div>
            <div id="SocialLogos">
                <img src="https://cdn3.iconfinder.com/data/icons/glypho-social-and-other-logos/64/logo-facebook-512.png"/>
                <img src="https://cdn-icons-png.flaticon.com/512/87/87390.png"/>
                <img src="https://cdn-icons-png.flaticon.com/512/81/81609.png"/>
                <a href='https://api.whatsapp.com/send?phone=+92300########'><img src="https://static.vecteezy.com/system/resources/previews/002/534/047/original/social-media-whatsapp-black-logo-mobile-app-icon-free-free-vector.jpg"/>
                </a>
            </div>
        </div>
    </div>
  )
}
