import React,{useEffect,useState} from 'react'
import { Avatar,TextField } from "@mui/material";
import { Link, useNavigate,useParams } from "react-router-dom";
import './AdminAddProduct.css'
export default function Profile() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");
    const [price, setPrice] = useState("");
    const [comment, setComment] = useState("");
    const navigate = useNavigate();
    const [sizeFilter,setSizeFilter] = useState([]);
    const [typeFilter,setTypeFilter] = useState('');
    var {username,email} = useParams();
    useEffect(()=>{

    },[])
    async function addNewProduct(){
        if(name.length==0){
            alert('Product Name Required!')
        }
        else if(description.length==0){
            alert('Product Description Required!')
        }
        else if(url.length==0){
            alert('Product Image URL Required!')
        }
        else if(price.length==0){
            alert('Product Price Required & Should Be A Number!')
        }
        else if(comment.length==0){
            alert('Descriptive Comment Required!')
        }
        else if(sizeFilter.length==0){
            alert('Select Available Sizes!')
        }
        else if(typeFilter.length==0){
            alert('Select Type!')
        }
        else{
            const response = await fetch('http://localhost:1337/api/addProduct',{
            method:'POST',
            headers:{
                'Content-Type' : 'application/json',
            },
            body:JSON.stringify({
                name,
                description,
                url,
                price,
                sizes:sizeFilter,
                comments:[[comment,username]],
                type:typeFilter
            })
            })

            const data = await response.json()
            if(data.status=='OK'){
                navigate('/adminpanel/'+username+'/'+email)
                alert('Product Added!')
            }else{
                console.log(data.status)
            }
        }
    }
  return (
    <div className='dashboard'>
        <div className='navBar'>
            <h1>Fashion Cube Administration</h1>
        </div>
        <div className='profileBody'>
            <div id='profileInputDiv'>
                <p>Name:</p>
                <TextField id="filled-basic"
                    InputLabelProps={{
                        style: { color: '#fff'}, 
                    }}    
                    label=" Name" variant="filled" 
                    className="login__textBox"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div id='profileInputDiv'>
                <p>Description:</p>
                <TextField id="filled-basic" 
                    InputLabelProps={{
                        style: { color: '#fff'}, 
                    }}
                    label="Description" variant="filled" 
                    className="login__textBox"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div id='profileInputDiv'>
                <p>Image URL:</p>
                <TextField id="filled-basic" 
                    InputLabelProps={{
                        style: { color: '#fff'}, 
                    }}
                    label="Image URl" variant="filled" 
                    className="login__textBox"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
            </div>
            <div id='profileInputDiv'>
                <p>Price:</p>
                <TextField id="filled-basic" 
                    InputLabelProps={{
                        style: { color: '#fff'}, 
                    }}
                    label="Price" variant="filled" 
                    className="login__textBox"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
            </div>
            <div id='profileInputDiv'>
                <p>Comment:</p>
                <TextField id="filled-basic" 
                    InputLabelProps={{
                        style: { color: '#fff'}, 
                    }}
                    label="Comment" variant="filled" 
                    className="login__textBox"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
            </div>
            <div id='newPSizes'>
                <p id='adminName'>Sizes: </p>
                {['S','M','L'].map(function(size, q){
                return(
                    <p id={sizeFilter.includes(size)?'adminBoxSelected':'adminBoxText'}
                            onClick={()=>{
                                if(sizeFilter.includes(size)){
                                    console.log(size)
                                    var temp = sizeFilter.filter(function(item) {
                                        return item !== size
                                    })
                                    setSizeFilter([...temp])
                                }else{
                                    setSizeFilter([...sizeFilter,size])
                                }
                            }}
                        >{size}</p>
                )})}
            </div>
            <div id='newPSizes'>
                <p id='adminName'>Types: </p>
            <div id='typesBox'>

                {['Shirts','Pants','Shoes',"Key Chains","Watches","Glasses"].map(function(type, q){
                return(
                    <p id={type==typeFilter?'adminBoxSelected':'adminBoxText'}
                            onClick={()=>{
                                if(type==typeFilter){
                                    setTypeFilter("")
                                }else{
                                    setTypeFilter(type)
                                }
                            }}
                        >{type}</p>
                )})}

            </div>
            </div>
                            
            <p id='cCheckOut'
                    onClick={addNewProduct}
                >Add New Product</p>
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
                <img src="https://cdn-icons-png.flaticon.com/512/48/48968.png"/>
            </div>
        </div>
    </div>
  )
}
