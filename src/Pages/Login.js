import React, { useEffect, useRef, useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import {motion} from 'framer-motion'
import axios from 'axios';

function Login() {
  
  const email = useRef();
  const userPassword = useRef();
  const [userLogin, setUserLogin] = useState([]);
  const [data,setData]=useState([])
  console.log(data);
  const navigate = useNavigate();
  const userLoginClick = () => {
    var IsLoggedIn = false;
    let uEmail = email.current.value;
    let uPassword = userPassword.current.value;
    email.current.value = null;
    setUserLogin(() => {
      return { email: uEmail, password: uPassword };
    });
   
    // const fNameParse = JSON.parse(localStorage.getItem("user_registration"));
    
    if(data !=null){
      data.map((userDetails) => {
        if (uEmail == userDetails.email && uPassword == userDetails.password ) {
          console.log(userDetails.username);
          
          IsLoggedIn = true;
          swal("Login success fully completed","Explore your favourite movies");
          
          let swalB=document.querySelector('.swal-button')
  if (swalB !=null){
    swalB.addEventListener('click',()=>{
      setTimeout(()=>{
        console.log(userDetails.username);
        navigate("/home", { state: { email:userDetails.email,name:userDetails.username} });
       },100)

    })
  }
        }
        
      });
  
      if (IsLoggedIn == false ) {
        swal("Login failed","Please try again");
      }
    }else{
      window.alert('No user found')
    }
    
  };
  useEffect(() => {
    axios
      .get(
        "https://api-post-4d9b3-default-rtdb.firebaseio.com/netflix/register/.json"
      )
      .then((res) => {
        if (res.data != null) {
          let deta = Object.values(res.data);
          setData(deta);
        }
      });
  }, []);
//   useEffect(()=>{
    
//     const sr=ScrollReveal({
//       distance:'60px',
//   })
//   sr.reveal('.main-head',{origin:'bottom',delay:'500',duration:'4500'})
// sr.reveal('.second-head-login',{origin:'bottom',delay:'900',duration:'4600'})
// sr.reveal('.third-head-login',{origin:'bottom',delay:'900',duration:'600'})
// sr.reveal('.input-login',{origin:'bottom',delay:'1200',duration:'1700'})
//   })
  return (
    <div className='login' >
      <div className="logo-login">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png" alt="" className="logo-image" />
        <button onClick={()=>{
          navigate('/sign_up')
        }} className="sign-up">Sign up</button>
      </div>
      <div className="fade_bottom-login"></div>
      <div className="details-login">
        <motion.h1 initial={{opacity:0,y:120}} animate={{opacity:1, y:0}} transition={{duration:1.5,type:'spring'}} className='main-head' >Unlimited movies, TV shows and more</motion.h1>
        <motion.h2 initial={{opacity:0,y:120}} animate={{opacity:1, y:0}} transition={{delay:.5,duration:1.5,type:'spring'}} className="second-head-login">Watch anywhere. Cancel anytime.</motion.h2>
        <motion.h3 initial={{opacity:0,y:120}} animate={{opacity:1, y:0}} transition={{delay:.5,duration:1.5,type:'spring'}} className="third-head-login">Ready to watch? Enter your email to create or restart your membership.</motion.h3>
      </div>
      <motion.div initial={{opacity:0,y:120}} animate={{opacity:1, y:0}} transition={{delay:1,duration:1.5,type:'spring'}} className="input-login">
        <input ref={email} type="email" placeholder='Email address' />
        <input ref={userPassword} type="password" placeholder='Password' />
        <button onClick={userLoginClick} className='get-started' >Login</button>
      </motion.div>
    </div>
  )
}

export default Login
