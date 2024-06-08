import React, { useEffect, useRef, useState } from "react";
import "./signUp.css";
import { useNavigate } from "react-router-dom";
import {motion} from 'framer-motion'
import axios from "axios";

function SignUp() {
  let userLastName = useRef();
  let userEmail = useRef();
  let userPassword = useRef();
  // const [userRegistration, setuserRegistration] = useState([]);
  const [data, setData] = useState([]);
  console.log(data);
  const navigate = useNavigate();
  // useEffect(() => {
  //   const fNameParse = JSON.parse(localStorage.getItem("user_registration"));

  //   if (fNameParse) setuserRegistration(fNameParse);
  // }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     localStorage.setItem(
  //       "user_registration",
  //       JSON.stringify(userRegistration)
  //     );
  //   }, 100);
  // }, [userRegistration]);
  const userCreate = (e) => {
    e.preventDefault()
    var isRegistered = false;
    let uUserName = userLastName.current.value;
    let uEmail = userEmail.current.value;
    let uPassword = userPassword.current.value;
    const userData = {
      email: uEmail,
      username: uUserName,
      password: uPassword,
    };
    
    
    // console.log(uFirstName);
    // console.log(uLastName);

    if (uEmail != "" && uUserName != "" && uPassword != "") {
      data.map((uR) => {
        if (uEmail == uR.email) {
          window.alert("User Already Registered");
          isRegistered = true;
        }
      });
      if (isRegistered == false) {
        window.alert("User Registered");
        fetch(
          "https://api-post-4d9b3-default-rtdb.firebaseio.com/netflix/register/.json",
          {
            method: "POST",
            body: JSON.stringify(userData),
          }
        );

        setTimeout(() => {
          navigate("/");
        }, 100);
      }
    } else {
      window.alert("Please register");
    }

    userLastName.current.value = null;
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
  return (
    <div className="sign-up-main">
      <div className="logo-login">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png"
          alt=""
          className="logo-image"
        />
        <button
          onClick={() => {
            navigate("/");
          }}
          className="sign-up"
        >
          Login
        </button>
      </div>
      <div className="fade_bottom-login"></div>

      <div className="input-signup">
        <form className="form-register" action="" onSubmit={userCreate} >

        <motion.input initial={{opacity:0,y:120}} animate={{opacity:1, y:0}} transition={{duration:1.5,type:'spring'}} ref={userLastName} type="text" placeholder="Username" />
        <motion.input initial={{opacity:0,y:120}} animate={{opacity:1, y:0}} transition={{delay:.5,duration:1.5,type:'spring'}} ref={userEmail} type="email" placeholder="Email address" />
        <motion.input initial={{opacity:0,y:120}} animate={{opacity:1, y:0}} transition={{delay:1,duration:1.5,type:'spring'}} ref={userPassword} type="password" placeholder="Password" />
        <motion.button initial={{opacity:0,y:120}} animate={{opacity:1, y:0}} transition={{delay:1.5,duration:1.5,type:'spring'}}  className="get-signup">
          Sign Up
        </motion.button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
