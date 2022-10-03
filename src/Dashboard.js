import React,{useState,useEffect} from 'react'
import { Link, useNavigate,useParams } from "react-router-dom";
import { Avatar,TextField } from "@mui/material";
import './Dashboard.css'
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'

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
function Item(props)
{
    return (
        <Paper>
            <img id="sliderImages" src={props.item.img} alt={props.item.alt}/>
        </Paper>
    )
}
export default function Dashboard() {
  const [products,setProducts] = useState([]);
  const [allProducts,setAllProducts] = useState([]);
  const [cart,setCart] = useState([]);
  const [limit,setLimit] = useState('');
  const [sizeFilter,setSizeFilter] = useState([]);
  const [openTypes,setOpenTypes] = useState([]);
  const navigate = useNavigate();
  var {username,email} = useParams();
  var types = ['Shirts','Pants','Shoes']

  var items = [
    {
        img: "https://previews.123rf.com/images/igorvkv/igorvkv1801/igorvkv180100025/93528968-winter-sale-banner-template-design-vector-illustration.jpg",
        alt: "Winter Sale!"
    },
    {
        img: "https://cdn.pixabay.com/photo/2018/01/12/13/01/discount-3078216_960_720.jpg",
        alt: "Winter Sale!"
    },
    {
        img: "https://ybooy.com/wp-content/uploads/2018/10/Home-ybooy-banner-Kids.jpg",
        alt: "Winter Sale!"
    },
    {
        img: "https://img.freepik.com/free-psd/summer-sale-70-discount_23-2148476960.jpg",
        alt: "Winter Sale!"
    },
    {
        img: "https://www.creativefabrica.com/wp-content/uploads/2020/06/05/Summer-sale-banner-design-Graphics-4284812-1-580x365.jpg",
        alt: "Summer Sale!"
    },
    {
        img: "https://image.shutterstock.com/image-vector/hot-summer-sale-template-banner-260nw-419412433.jpg",
        alt: "Summer Sale!"
    }
    ]

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
            <h1>Fashion Cube Store</h1>
            <p id='navMainProfileButton'
                    onClick={async ()=>{
                        navigate('/profile/'+username+'/'+email)
                    }}
                >Profile Section</p>
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
                <p id='dashRHeadText'>Popular Categories</p>
                <p id='dashRCartButton'
                    onClick={async ()=>{
                        navigate('/cart/'+username+'/'+email+'/'+JSON.stringify(cart))
                    }}
                >Open Cart</p>
                </div>
                <Carousel>
                    {
                        items.map( (item, i) => <Item key={i} item={item} /> )
                    }
                </Carousel>
                <div id='dashRBody'>
                {types.map(function(item, i){
                return(
                <div key = {i}>
                    <p id={openTypes.length==0?"pTypeButton":(openTypes.includes(item))?"pType":"hideBox"}
                        onClick={()=>{
                            if(openTypes.includes(item)){
                                setOpenTypes([])
                            }else{
                                setOpenTypes([item])
                            }
                        }}
                    >{item}</p>
                    <div id={openTypes.includes(item)?'dashRCat':'hideBox'}>
                    {
                        products.map(function(product, k){
                            if(product.type==item){
                            return(
                            <div id='dashRItem' key={k}>
                                <div onClick={()=>{
                                    navigate('/product/'+username+'/'+email+'/'+product._id)
                                }}>
                                <div id="pImageContainer">
                                <img
                                    src={product.url}
                                    alt={item}
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
                                <div id = {cart.includes(product._id)?'pRemoveCartButton':'pAddCartButton'}
                                    onClick={()=>{
                                        if(cart.includes(product._id)){
                                            var temp = cart.filter(function(item) {
                                                return item !== product._id
                                            })
                                            setCart([...temp])
                                        }else{
                                            setCart([...cart,product._id])
                                        }
                                    }}
                                >
                                {
                                    cart.includes(product._id)?
                                    <p >Remove From Cart</p>
                                    :
                                    <p >Add To Cart</p>
                                }
                                </div>
                            </div>
                            )}
                          })
                    }
                    </div>
                </div>
                )
                })}
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
