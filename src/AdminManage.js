import React,{useEffect,useState} from 'react'
import './Cart.css'
import { Avatar,TextField } from "@mui/material";
import { Link, useNavigate,useParams } from "react-router-dom";
export default function AdminManage() {
    const navigate = useNavigate();
    var {username,email} = useParams();
    const[orders,setOrders] = useState([])
    const[notify,setNotify] = useState([])
    const[products,setProducts] = useState([])
    const[total,setTotal] = useState(0)
    useEffect(()=>{
        async function getData(){
            var response = await fetch('http://localhost:1337/api/getAllOrders',{
                method:'POST',
                headers:{
                    'Content-Type' : 'application/json',
                },
                body:JSON.stringify({})
                })
            const orders = await response.json()
            var tempOrder = orders.data
            setOrders([...tempOrder])
            
            response = await fetch('http://localhost:1337/api/getAllNotifications',{
                method:'POST',
                headers:{
                    'Content-Type' : 'application/json',
                },
                body:JSON.stringify({})
                })
            const notification = await response.json()
            var tempNotify = notification.data
            setNotify([...tempNotify])

            var tempPro = []
            var p = []
            
            for(var i=0;i<tempOrder.length;i++){
                for(var j=0;j<tempOrder[i].order.length;j++){
            
                const response = await fetch('http://localhost:1337/api/getProduct',{
                    method:'POST',
                    headers:{
                        'Content-Type' : 'application/json',
                    },
                    body:JSON.stringify({
                        id:tempOrder[i].order[j]
                    })
                    })
                const product = await response.json()
                if(product.data==null){
                    console.log("null data")
                }else{
                p.push(product.data)}
                }
                
                tempPro.push(p)
                p=[]
            }
            setProducts([...tempPro])
        }
        getData()
    },[])

    async function getData(productId){
        var response = await fetch('http://localhost:1337/api/getProduct',{
            method:'POST',
            headers:{
                'Content-Type' : 'application/json',
            },
            body:JSON.stringify({
                id:productId
            })
            })
        const product = await response.json()
        response = await fetch('http://localhost:1337/api/deleteNotification',{
            method:'POST',
            headers:{
                'Content-Type' : 'application/json',
            },
            body:JSON.stringify({
                id:productId
            })
            })
        const update = await response.json()
       
        var temp = notify.filter(function(item) {
            return item.productId !== productId
        })
        setNotify([...temp])
        
        if(product.data==null){
            alert('Product Not Found, Probably Deleted!')
        }else{
            navigate('/product/'+username+'/'+email+'/'+productId)
        }
    }
    
    return (
    <div className='cart'>
        <div className='navBar'>
            <h1>Fashion Cube Administration</h1>
        </div>
        <div className='cartBody'>
            <p id='dashRHeadText'>Current Orders</p>
            {   
                products.map(function(product, i){
                    return(
                        <div id={orders[i].orderStatus=='Incomplete'?'showDiv':'hideDiv'}>
                            <div id='productItem'>
                            <p id='cPName'>Ordered By: {orders[i].email}</p>
                            <p id='cPPrice'>Total Price: ${orders[i].totalPrice.$numberDecimal}</p>
                            <p id='changeStatusButton'
                                onClick={async ()=>{

                                    const response = await fetch('http://localhost:1337/api/changeOrderStatus',{
                                        method:'POST',
                                        headers:{
                                            'Content-Type' : 'application/json',
                                        },
                                        body:JSON.stringify({
                                            id:orders[i]._id,
                                        })
                                    })
                                    const d = await response.json()
                                    if(d.status=='OK'){
                                            var temp = orders.filter(function(item) {
                                                return item !== orders[i]
                                            })
                                            setOrders([...temp])
                                            
                                            temp = products.filter(function(item) {
                                                return item !== product
                                            })
                                            setProducts([...temp])
                                            
                                            alert('Order Completed')
                                    }else{
                                        alert('Error!')
                                    }
                                    
                                }}
                            >Complete Order</p>
                            
                            </div>
                            {
                            product.map(function(p, i){
                                return(
                            <div id='productItem'>
                                <img id='productItemImg'
                                        src={p.url}
                                        alt={p.name}
                                />
                            <p id='cPName'>{p.name}</p>
                            <p id='cPPrice'>${p.price.$numberDecimal}</p>
                            </div>
                            )})
                            }
                        </div>
                        
                    )
                })
            }
            <p id='dashRHeadText'>Old Orders</p>
            {   
                products.map(function(product, i){
                    return(
                        <div id={orders[i].orderStatus=='Completed'?'showDiv':'hideDiv'}>
                            <div id='productItem'>
                            <p id='cPName'>Ordered By: {orders[i].email}</p>
                            <p id='cPPrice'>Total Price: ${orders[i].totalPrice.$numberDecimal}</p>
                            
                            </div>
                            {
                            product.map(function(product, i){
                                return(
                            <div id='productItem'>
                                <img id='productItemImg'
                                        src={product.url}
                                        alt={product.name}
                                />
                            <p id='cPName'>{product.name}</p>
                            <p id='cPPrice'>${product.price.$numberDecimal}</p>
                            </div>
                            )})
                            }
                        </div>
                        
                    )
                })
            }
            <p id='dashRHeadText'>Notifications</p>
            {   
                notify.map(function(n, i){
                    return(
                        <div id='productItem'>
                        <p id='cPName'>Message By: {n.name}</p>
                        <p id='cPPrice'>Client Email: {n.email}</p>
                        <p id='changeStatusButton'
                                onClick={()=>{
                                    getData(n.productId)
                                }}
                            >View Message</p>
                            
                        </div>
                    )
                })
            }
            
        </div>
        <div id='footer'>
            <p>All rights are reserved by Fashion Cube. 2022</p>
        </div>
    </div>
  )
}
