import '../styles/Footer.css'

function Footer(){
    return(
        <div className="containerFooter">
            <p>Pour les passionnes des plantes</p>
            Laisser nous votre email: 
            <br/><input type="text" className='inputmail' placeholder="Entrez votre email" />
        </div>
    )
}
export default Footer;