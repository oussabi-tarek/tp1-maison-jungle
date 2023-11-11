import React, {useEffect, useState} from 'react';
import { useAddUser } from '../hooks/user/useAddUser';


function Register(){
    const {saveUser}=useAddUser();
    const onSaveUserInfosClick= async(event)=>{
        event.preventDefault();
        const form=event.target;
        const fullName=form.fullName.value;
        const password=form.password.value;
        const email=form.email.value;
        const address=form.address.value;
        const phone=form.phone.value;
        const userInfos={fullName,email,password,address,phone,loggedIn:true};
        localStorage.setItem('userInfos',JSON.stringify(userInfos));
        await saveUser(userInfos);
        window.location.href='/';
    }
    
    return(
        <div className="containerRegister">
            <h3>Your informations</h3>
            <form onSubmit={onSaveUserInfosClick}>
                <input  type="text" name="fullName"  placeholder="Full Name" />
                <input type="email" name="email" placeholder="Email" />
                <input type="password" name="password" placeholder="Password" />
                <input type="text" name="address" placeholder="Address"  />
                <input type="tel" name="phone" placeholder="Phone" />
                <button>Save</button>
            </form>    
            <a href='/'>Login</a>
        </div>
    );
}

export default Register;