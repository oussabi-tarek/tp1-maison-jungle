import { useAxios } from "../hooks/axios/useAxios";
import { ENDPOINTS } from "../hooks/endpoints";
import { useState } from "react";


function Login(props){
    const axiosInstance=useAxios();
    const [badCredentials, setbadCredentials] = useState(false);
    const isLoggedIn= JSON.parse(localStorage.getItem('userInfos'))!==null ? JSON.parse(localStorage.getItem('userInfos')).loggedIn:false;
    const onSaveUserInfosClick= async(event)=>{
        event.preventDefault();
        const userToLogin={email:event.target.email.value,password:event.target.password.value};
        axiosInstance.defaults.headers.common['Content-Type']='application/json';
        axiosInstance.post(ENDPOINTS.SIGIN,userToLogin)
            .then((res)=>{
             if(res.data){
                setbadCredentials(false);
                props.setLoggedIn(true);

                localStorage.setItem('token',res.data.accessToken);
                localStorage.setItem('refreshToken',res.data.refreshToken);
                const fullName=res.data.fullName;
                const email=res.data.email;
                const address=res.data.address;
                const phone=res.data.phone;
                const userInfos={fullName,email,address,phone,loggedIn:true};
                localStorage.setItem('userInfos',JSON.stringify(userInfos));
                window.location.href='/';
              }
              else{
                setbadCredentials(true);
              } 
            })
            .catch((err)=>{
            console.log(err)
        })
    }
    return(
        !isLoggedIn &&
        <div className="containerLogin">
            <h5>you are not login yet</h5>
            <form  onSubmit={onSaveUserInfosClick}> 
                <input type="text" placeholder="email" name="email" />
                <input type="password" placeholder="Password" name="password" />
                <button type="submit">Login</button>
            </form>
            <a href="/register">Do not have account?</a>
            { badCredentials &&
                <p>Bad Credentials</p>}
        </div>
    )
}

export default Login;