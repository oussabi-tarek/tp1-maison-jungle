import CareScale from "./CareScale";


function PlantItem(props){
    return(
        <div className="containerShop">
            <img src={props.getImageFromBytes(props.plant.cover.data)} className="imageItem"/>
            <p>{props.plant.name}</p>
            <CareScale  props={props.plant}/>
            <button onClick={()=>props.onAjoutClick(props.plant)}>Ajouter</button>
        </div>
    )
}
export default PlantItem;   