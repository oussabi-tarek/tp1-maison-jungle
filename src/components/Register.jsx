import React, {useEffect, useState} from 'react';

function Register(props){
    const [userInfos, setUserInfos] = useState({});
    useEffect(()=>{
        if(JSON.parse(localStorage.getItem('userInfos'))!==null) {
            const localStorageItems=JSON.parse(localStorage.getItem('userInfos'));
            setUserInfos(localStorageItems);          
        }
    },[])
    
    return(
        <div className="containerRegister">
            <h3>Your informations</h3>
            <form onSubmit={props.onSaveUserInfosClick}>
                <input  type="text" name="fullName" defaultValue={userInfos.fullName} placeholder="Full Name" />
                <input type="email" name="email" placeholder="Email" defaultValue={userInfos.email} />
                <input type="text" name="address" placeholder="Address" defaultValue={userInfos.address} />
                <input type="tel" name="phone" placeholder="Phone" defaultValue={userInfos.phone} />
                <button>Save</button>
            </form>    
        </div>
    );
}

export default Register;