import React,{useEffect,useState} from 'react'
import './Product.css'
import { Avatar,TextField } from "@mui/material";
import { Link, useNavigate,useParams } from "react-router-dom";
export default function Product() {
    const navigate = useNavigate();
    var {username,email,id} = useParams();
    const[products,setProducts] = useState([])
    const[newComment,setNewComment] = useState('')
    const[total,setTotal] = useState(0)
    useEffect(()=>{
        async function getData(){
            const response = await fetch('http://localhost:1337/api/getProduct',{
                method:'POST',
                headers:{
                    'Content-Type' : 'application/json',
                },
                body:JSON.stringify({
                    id:id
                })
                })
            const product = await response.json()
            console.log(product)
            setProducts([product.data])
        }
        getData()
    },[])
    async function postComment(){
        if(newComment.length==0){
            alert('New Comment Required!')
        }else{
            var response = await fetch('http://localhost:1337/api/postComment',{
                method:'POST',
                headers:{
                    'Content-Type' : 'application/json',
                },
                body:JSON.stringify({
                    email:email,
                    id:id,
                    name:username,
                    comments:[...products[0].comments,[newComment,username]]
                })
            })

        const data = await response.json()
        
        response = await fetch('http://localhost:1337/api/AdminCheck',{
            method:'POST',
            headers:{
                'Content-Type' : 'application/json',
            },
            body:JSON.stringify({
                email:email,
            })
        })

        const dataOk = await response.json()
        
        if(data.status=='OK'){
            if(dataOk.status=='OK'){
                navigate('/adminmanage/'+username+'/'+email)
                alert('Comment Posted!')
            }
            else{
                navigate('/dashboard/'+username+'/'+email)
                alert('Comment Posted!')
            }
        }else{
            alert(data.status)
        }

        }
    }
    return (
    <div className='prod'>
        <div className='navBar'>
            <h1>Fashion Cube Store</h1>
        </div>
        <div className='productBody'>
            {   
                products.map(function(product, i){
                    console.log(product)   
                    return(
                        <div id='productpage'>
                        <div id='productMain'>
                            <img id='productPageImg'
                                    src={product.url}
                                    alt={product.name}
                            />
                        <div id='productInfo'>
                        <p id='cPName'>Product Name: {product.name}</p>
                            <p id='cPName'>Description: {product.description}</p>
                            <div id='ppSizes'>
                                <p id='cPName'>Sizes: </p>
                                {product.sizes.map(function(size, q){
                                return(
                                <p id='cPName' key={q}>{size}</p>
                                )})}
                            </div>
                            <p id='cPPrice'>Price: ${product.price.$numberDecimal}</p>
                            
                        </div>
                        </div>
                        <div id='productComments'>
                        {products[0].comments.map(function(comment, q){
                            return(
                            <div id='commentBox'>
                                <p id='commentUser' key={q}>{comment[1]}: </p>
                                <p id='userComment' key={q+products[0].comments.length}>{comment[0]}</p>
                            </div>
                        )})}
                        </div>
                        </div>
            
                    )
                })
            }
            
                            
            <div id='commentInput'>
                <TextField id="filled-basic" 
                label="Post New Comment" variant="filled" 
                InputLabelProps={{
                    style: { color: '#fff'}, 
                 }}
                className="register__textBox"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                />

            </div>
            <div id='cTotal'>
                <p id='cCheckOut'
                    onClick={()=>{postComment()}}
                >Post Comment</p>
            </div>
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
