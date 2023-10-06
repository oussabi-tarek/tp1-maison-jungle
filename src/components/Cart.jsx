import '../styles/Cart.css'

function Cart(props){

   return(
    <div className='containerCart'>
      <h2>Panier</h2>
        <ul>
          { props.panierItems!==null &&
            props.panierItems.map((plant,index)=>{
               return <li key={index}>{plant.quantity} {plant.name} {plant.price}$</li>
            })
          }
        </ul>
      <p>Total : {props.totalPrice}$</p>  
      <button onClick={props.onViderClick}>Vider le panier</button>
    </div>
   )
}
export default Cart;