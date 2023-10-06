import CareScale from "./CareScale";


function PlantItem(props){
    return(
        
        <div className="containerShop">
            <img src={props.plant.cover} className="imageItem"/>
            <p>{props.plant.name}</p>
            <CareScale props={props.plant}/>
            <button onClick={()=>props.onAjoutClick(props.plant)}>Ajouter</button>
        </div>
    )
}
export default PlantItem;   