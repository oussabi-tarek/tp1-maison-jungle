import { useEffect } from 'react';
import logo from '../assets/logo.png'
import '../styles/Navbar.css'
import { useState } from 'react';

function NavBar(props){
   const [isLoggedIn, setLoggedIn] = useState(props.loggedIn);
   useEffect(()=>{
   const loggedIn= JSON.parse(localStorage.getItem('userInfos'))!==null ? JSON.parse(localStorage.getItem('userInfos')).loggedIn:false;
   setLoggedIn(loggedIn);
   },[JSON.parse(localStorage.getItem('userInfos'))])
   
   const onLogoutClick=()=>{
         localStorage.removeItem('userInfos');
         window.location.href='/login';
   }
   
  return (
     <div className='container'>
        <img src={logo} className='image' />
        <h5>La maison jungle</h5>
        { isLoggedIn &&
        <button className='button' onClick={onLogoutClick}>Logout</button>
        }
        </div>
    )

}

export default NavBar;