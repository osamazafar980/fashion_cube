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
