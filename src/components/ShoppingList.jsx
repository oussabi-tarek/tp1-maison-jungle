import PlantItem from './PlantItem'

function ShoppingList(props){
    return(
        <div className="containerShopList">
         {
            props.activePlantList.map((plant, index) => {
                return <PlantItem getImageFromBytes={props.getImageFromBytes} key={index} plant={plant} onAjoutClick={props.onAjoutClick}/>
            })
         }
        </div>
    )
}
export default ShoppingList;