import React,{useEffect,useState} from 'react'
import './Cart.css'
import { Avatar,TextField } from "@mui/material";
import { Link, useNavigate,useParams } from "react-router-dom";
export default function Cart() {
    const navigate = useNavigate();
    var {username,email,cData} = useParams();
    cData = JSON.parse(cData)
    const[products,setProducts] = useState([])
    const[address,setAddress] = useState('')
    const[total,setTotal] = useState(0)
    useEffect(()=>{
        async function getData(){
            var tempPro = []
            var sum = 0
            for(var i=0;i<cData.length;i++){
            const response = await fetch('http://localhost:1337/api/getProduct',{
                method:'POST',
                headers:{
                    'Content-Type' : 'application/json',
                },
                body:JSON.stringify({
                    id:cData[i]
                })
                })
            const product = await response.json()
            tempPro.push(product.data)
            sum = sum + parseFloat(product.data.price.$numberDecimal)
            }
            setProducts([...tempPro])
            setTotal(sum)
            console.log(products)
        }
        getData()
    },[])
    async function placeOrder(){
        if(address.length==0){
            alert('Address Required!')
        }else{
            const response = await fetch('http://localhost:1337/api/placeOrder',{
            method:'POST',
            headers:{
                'Content-Type' : 'application/json',
            },
            body:JSON.stringify({
                email:email,
                totalPrice:total,
                order:cData,
                address:address,
                status:'Incomplete'
                ,
            })
        })

        const data = await response.json()
        if(data.status){
            navigate('/dashboard/'+username+'/'+email)
            alert('Order Placed!')
        }else{
            alert(data.status)
        }

        }
    }
    return (
    <div className='cart'>
        <div className='navBar'>
            <h1>Fashion Cube Store</h1>
        </div>
        <div className='cartBody'>
            {   
                products.map(function(product, i){
                    console.log(product)   
                    return(
                        <div id='productItem'>
                            <img id='productItemImg'
                                    src={product.url}
                                    alt={product.name}
                            />
                        <p id='cPName'>{product.name}</p>
                        <p id='cPPrice'>${product.price.$numberDecimal}</p>
                        </div>
                    )
                })
            }
            <div id='cAddress'>
                <TextField id="filled-basic" 
                label="Address" variant="filled" 
                InputLabelProps={{
                    style: { color: '#fff'}, 
                 }}
                className="register__textBox"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                />

            </div>
            <div id='cTotal'>
                <p id='cCheckOut'
                    onClick={()=>{placeOrder()}}
                >CheckOut</p>
                <p id='cTotalValue'>Total: {total}</p>
            </div>
        </div>
        <div id='footer'>
            <p>All rights are reserved by Fashion Cube. 2022</p>
        </div>
    </div>
  )
}
