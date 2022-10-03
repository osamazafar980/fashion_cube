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
            <p>All rights are reserved by Fashion Cube. 2022</p>
        </div>
    </div>
  )
}
