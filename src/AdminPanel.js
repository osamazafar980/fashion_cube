import React,{useState,useEffect} from 'react'
import { Link, useNavigate,useParams } from "react-router-dom";
import { Avatar,TextField } from "@mui/material";
import './Dashboard.css'

async function addProduct (name,price,description,url,sizes,comments){
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
        sizes,
        comments
    })
    })

    const data = await response.json()
    console.log(data)
}

export default function AdminPanel() {
  const [products,setProducts] = useState([]);
  const [allProducts,setAllProducts] = useState([]);
  const [cart,setCart] = useState([]);
  const [limit,setLimit] = useState('');
  const [sizeFilter,setSizeFilter] = useState([]);
  const navigate = useNavigate();
  var {username,email} = useParams();
  var types = ['Shirts','Pants','Shoes']
  useEffect(()=>{
        fetch('http://localhost:1337/api/getAllProducts',{
            method:'POST',
            headers:{
                'Content-Type' : 'application/json',
            },
            body:JSON.stringify({})
        }).then((response) =>
        response.json().then((data) => {
            console.log(data.data)
            setProducts(data.data)
            setAllProducts(data.data)
        })
      );
    
  },[])
  function applyFilter(){
    var temp = [...allProducts]
    if(limit!=''){
    var temp1 = temp.filter(function(item) {
        if(item.price.$numberDecimal<=parseFloat(limit)){
            return true
        }
    })
    temp = [...temp1]
    }
    if(sizeFilter.length!=0){
        var temp1 = temp.filter(function(item) {
            for(var x=0;x<sizeFilter.length;x++){
                if(item.sizes.includes(sizeFilter[x])){
                    return true
                }
            }
        })
        temp = [...temp1]
    }
    setProducts(temp)
  }
  return (
    <div className='dashboard'>
        <div className='navBarMain'>
            <img
                id='imgLogo'
                src='https://previews.123rf.com/images/butenkow/butenkow1612/butenkow161201222/67326357-template-design-logo-fashion-vector-illustration-of-icon.jpg'
            />
            <h1>Fashion Cube Administration</h1>
            <p id='navMainProfileButton'
                    onClick={async ()=>{
                        navigate('/adminregister/'+username+'/'+email)
                    }}
                >Create New Admin</p>
        </div>
        <div className='dashBody'>
            <div className='dashL'>
                <p>Filters</p>
                <div id='filterContainer'>
                    <p>Select Size: </p>
                    <div id='filterBox'>
                        <p id={sizeFilter.includes('S')?'filterBoxSelected':'filterBoxText'}
                            onClick={()=>{
                                if(sizeFilter.includes('S')){
                                    var temp = sizeFilter.filter(function(item) {
                                        return item !== 'S'
                                    })
                                    setSizeFilter([...temp])
                                }else{
                                    setSizeFilter([...sizeFilter,'S'])
                                }
                            }}
                        >S</p>
                        <p id={sizeFilter.includes('M')?'filterBoxSelected':'filterBoxText'}
                            onClick={()=>{
                                if(sizeFilter.includes('M')){
                                    var temp = sizeFilter.filter(function(item) {
                                        return item !== 'M'
                                    })
                                    setSizeFilter([...temp])
                                }else{
                                    setSizeFilter([...sizeFilter,'M'])
                                }
                            }}
                        >M</p>
                        <p id={sizeFilter.includes('L')?'filterBoxSelected':'filterBoxText'}
                            onClick={()=>{
                                if(sizeFilter.includes('L')){
                                    var temp = sizeFilter.filter(function(item) {
                                        return item !== 'L'
                                    })
                                    setSizeFilter([...temp])
                                }else{
                                    setSizeFilter([...sizeFilter,'L'])
                                }
                            }}
                        >L</p>
                </div>
                </div>
                <div id='filterContainer'>
                    <p>Enter Price Limit: </p>
                    <div id='filterBox'>
                    <TextField id="filled-basic"
                    InputLabelProps={{
                        style: { color: '#fff'}, 
                    }}    
                    label="Price Limit" variant="filled" 
                    className="login__textBox"
                    value={limit}
                    onChange={(e) => setLimit(e.target.value)}
                />
                </div>
                </div>
                <div id='filterButtonContainer'>
                <p id='FiltterButton'
                    onClick={()=>{
                        var regex="/^[0-9]+$/";
                        if (isNaN(limit))
                        {
                            alert("Limit must be numbers");  
                            setLimit('')                          
                        }
                        else{
                            applyFilter()
                        }
                    }}
                >Apply Filter</p>
                <p id='FiltterButton'
                    onClick={ ()=>{
                        setLimit('')
                        setSizeFilter([])
                        setProducts(allProducts)
                    }}
                >Reset Filter</p>
                </div>
                
            </div>
            <div className='dashR'>
                <div id='dashRHead'>
                <p id='dashRHeadText'>Our Products</p>
                <div  id='dashRHeadButtons'>
                <p id='dashRCartButton'
                    onClick={async ()=>{
                        navigate('/addproduct/'+username+'/'+email)
                    }}
                >Add New Product</p>
                <p id='dashRCartButton'
                    onClick={async ()=>{
                        navigate('/adminmanage/'+username+'/'+email)
                    }}
                >Manage Orders & Messages</p>
                </div>
                </div>
                <div id='dashRBody'>
                <div>
                    <div id='dashRCat'>
                    {
                        products.map(function(product, k){
                            return(
                            <div id='dashRItem' key={k}>
                                <div onClick={()=>{
                                    navigate('/product/'+username+'/'+email+'/'+product._id)
                                }}>
                                <div id="pImageContainer">
                                <img
                                    id="pImageContainerIMG"
                                    src={product.url}
                                    alt={product.name}
                                />
                                </div>
                                <p id='pName'>Product Name: {product.name}</p>
                                <p id='pDesc'>{product.description}</p>
                                <p id='pPrice'>{product.price.$numberDecimal}</p>
                                <div id='pSizes'>
                                <p id='pSize'>Sizes: </p>
                                {product.sizes.map(function(size, q){
                                return(
                                <p id='pSize' key={q}>{size}</p>
                                )})}
                                </div>
                                </div>
                                <div id = {'pRemoveCartButton'}
                                    onClick={async ()=>{

                                        var response = await fetch('http://localhost:1337/api/deleteProduct',{
                                            method:'POST',
                                            headers:{
                                                'Content-Type' : 'application/json',
                                            },
                                            body:JSON.stringify({
                                                id:product._id
                                            })
                                        })
                                        response = await response.json()
                                        if(response.status=='OK'){
                                        if(products.includes(product)){
                                            var temp = products.filter(function(item) {
                                                return item._id !== product._id
                                            })
                                            setProducts([...temp])
                                        }
                                        alert(response.msg)
                                        }else{
                                            console.log('error')
                                        }
                                    }}
                                >
                                {
                                    <p >Delete Product</p>
                                }
                                </div>
                            </div>
                            )
                          })
                    }
                    </div>
                </div>
                
            </div>
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
