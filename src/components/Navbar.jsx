import logo from '../assets/logo.png'
import '../styles/Navbar.css'

function NavBar(){
  return (
     <div className='container'>
        <img src={logo} className='image' />
        <h5>La maison jungle</h5>
     </div>
    )

}

export default NavBar;