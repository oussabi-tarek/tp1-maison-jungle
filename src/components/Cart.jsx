import '../styles/Cart.css'

function Cart(props){
   return(
    <div className='containerCart'>
      { props.saved &&  <p className='itemsAdded'>Items saved! add others</p>}
      <h2>Panier</h2>
        <ul>
          { props.panierItems!==null &&
            props.panierItems.map((plant,index)=>{
               return <li key={index}>{plant.quantity} {plant.name} {plant.price}$</li>
            })
          }
        </ul>
      <p>Total : {props.totalPrice}$</p>  
      { props.panierItems!==null && props.panierItems.length>0 &&
      <>
      <button className='button'  onClick={props.onViderClick} >Vider le panier</button>
      <br/>
      <button className='button' onClick={props.onSaveCartClick}>Enregistrer</button>
      </>
      }
      </div>
   )
}
export default Cart;