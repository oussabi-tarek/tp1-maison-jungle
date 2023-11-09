
function Login(props){
    const isLoggedIn= JSON.parse(localStorage.getItem('userInfos'))!==null ? JSON.parse(localStorage.getItem('userInfos')).loggedIn:false;
    return(
        !isLoggedIn &&
        <div className="containerLogin">
            <h5>you are not login yet</h5>
            <form  onSubmit={props.onSaveUserInfosClick}> 
                <input type="text" placeholder="email" name="email" />
                <input type="password" placeholder="Password" name="password" />
                <button type="submit">Login</button>
            </form>
            <a href="/register">Do not have account?</a>
            { props.badCredentials &&
                <p>Bad Credentials</p>}
        </div>
    )
}

export default Login;