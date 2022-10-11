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
function LItem(props)
{
    return (
        <Paper>
            <img id="lsliderImages" src={props.item.img} alt={props.item.alt}/>
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
  const [dashL,setDashL] = useState(false);
  const navigate = useNavigate();
  var {username,email} = useParams();
  var types = ['Shirts','Pants','Shoes',"Key Chains","Watches","Glasses"]

  var items = [
    {
        img: "https://img.freepik.com/free-psd/winter-sale-banner-design-template_23-2149123167.jpg?w=2000",
        alt: "Winter Sale!"
    },
    {
        img: "https://static.vecteezy.com/system/resources/previews/004/563/903/original/winter-sale-background-special-offer-banner-background-for-business-and-advertising-illustration-free-vector.jpg",
        alt: "Winter Sale!"
    },
    {
        img: "https://img.freepik.com/free-psd/banner-template-winter-sale-with-woman-snowflakes_23-2148808315.jpg?w=2000",
        alt: "Winter Sale!"
    },
    {
        img: "https://img.freepik.com/free-vector/end-season-summer-sale_23-2148607742.jpg?w=2000",
        alt: "Winter Sale!"
    },
    {
        img: "https://img.freepik.com/free-vector/flat-summer-sale-horizontal-banner-template-with-photo_23-2148929588.jpg?w=2000",
        alt: "Summer Sale!"
    },
    {
        img: "https://img.freepik.com/free-vector/flat-summer-sale-horizontal-banner-template_23-2149388320.jpg?w=2000",
        alt: "Summer Sale!"
    }
    ]
    var leftBannar = [
       
        {
            img:"https://i.pinimg.com/564x/ff/9e/e9/ff9ee950486cc1df5af2b0d741c697e2.jpg",
            alt: "Winter Sale!"
        },
        {
            img:"https://i.pinimg.com/564x/1a/b3/f1/1ab3f1ea87baf95861a77e02ecfd5684.jpg",
            alt: "Winter Sale!"
        },
        {
            img:"https://i.pinimg.com/564x/45/bb/60/45bb60dd04282d6b2c52e1ff8e9fbb93.jpg",
            alt: "Winter Sale!"
        },
    ]
    var catImagesLinks=[
        "https://img.freepik.com/premium-psd/tshirt-mockup-template-design_68185-498.jpg?w=360",
        "https://static6.depositphotos.com/1000291/663/i/450/depositphotos_6634332-stock-photo-jeans-clothes-on-shelf-in.jpg",
        "https://t4.ftcdn.net/jpg/04/60/99/63/360_F_460996349_bIzl423o41oLdi5hJIgNT3OD8SViuo9i.jpg",
        "https://i0.wp.com/www.lasercutjewelry.net/wp-content/uploads/2013/10/keychain-2.jpg?fit=3600%2C2700&ssl=1",
        "https://ae01.alicdn.com/kf/H21c4ce82ad964b6a901270d13bc61fc0Z/Forsining-3d-Logo-Design-Hollow-Engraving-Black-Gold-Case-Leather-Skeleton-Mechanical-Watches-Men-Luxury-Brand.jpg_Q90.jpg_.webp",
        "https://www.creativefabrica.com/wp-content/uploads/2018/11/Glasses-Logo-by-Friendesign-Acongraphic-1.jpg"
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
            <h1
            onClick={()=>{
                navigate('/')
            }}
            >Fashion Cube Store</h1>
            <p id='navMainProfileButton'
                    onClick={async ()=>{
                        if(email==undefined){
                            navigate('/login')
                        }else{
                            navigate('/profile/'+username+'/'+email)
                        }
                    }}
                >{email==undefined?"Login":"Profile Section"}</p>
        </div>
        <div className='dashBody'>
            <div className='dashL'>
            <p id='dashRCartButton'
                    onClick={async ()=>{
                        navigate('/cart/'+username+'/'+email+'/'+JSON.stringify(cart))
                    }}
                >Open Cart</p>
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
                        style: { color: '#000000'}, 
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
                <div id="leftBannar">
                <Carousel>
                    {
                        leftBannar.map( (item, i) => <LItem key={i} item={item} /> )
                    }
                </Carousel>
                </div>
                
            </div>
            <div className='dashR'>
                
                <Carousel>
                    {
                        items.map( (item, i) => <Item key={i} item={item} /> )
                    }
                </Carousel>
                <div id='dashRBody'>
                {types.map(function(item, i){
                return(
                <div key = {i}>
                    <div id={openTypes.length==0?"pTypeButton":(openTypes.includes(item))?"pType":"hideBox"}
                        onClick={()=>{
                            if(openTypes.includes(item)){
                                setOpenTypes([])
                            }else{
                                setOpenTypes([item])
                            }
                        }}
                    >
                        <img
                            id={openTypes.length==0?"pTypeButton":(openTypes.includes(item))?"hideBox":"hideBox"}
                            src={catImagesLinks[i]}
                        />
                        <p
                            id = "catTitle"
                        >{item}</p>
                    </div>
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
