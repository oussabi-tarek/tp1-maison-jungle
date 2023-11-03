import CareScale from "./CareScale";


function PlantItem(props){
    return(
        <div className="containerShop">
            <div className="imgpriceShop">
            <div className="imgShop">   
            <img src={props.getImageFromBytes(props.plant.cover.data)} className="imageItem"/>
            </div>
            <div className="priceShop">
             <p >{props.plant.price}</p></div>
            </div>
            <p>{props.plant.name}</p>
            <CareScale  props={props.plant}/>
            <button onClick={()=>props.onAjoutClick(props.plant)}>Ajouter</button>
        </div>
    )
}
export default PlantItem;   