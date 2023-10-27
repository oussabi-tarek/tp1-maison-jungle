import Cart from "./Cart";
import Categories from "./Categories";
import ShoppingList from "./ShoppingList";
import "../styles/Section.css";
import { useEffect, useState } from "react";
import { useGetPlants } from "../hooks/plant/useGetPlants";

function Section(){
    const [activeCategory, setActiveCategory] = useState('classique');
    const [panierItems, setPanierItems] = useState([]); 
    const [totalPrice, setTotalPrice] = useState(0);
    const {plantList}=useGetPlants();

    const getClassiquePlantList = () => {
        const plantListFiltered = plantList.filter((plant) => {
            return plant.category === 'classique';
        }
        );
      return plantListFiltered;
    }
    useEffect(()=>{
        if(JSON.parse(localStorage.getItem('panierItems'))!==null) {
             const localStorageItems=JSON.parse(localStorage.getItem('panierItems'));
                localStorageItems.forEach((plant)=>{
                    let exist=false;
                    panierItems.forEach((item)=>{
                        if(item.id===plant.id){
                            exist=true;
                    }})
                    if(!exist){
                        panierItems.push(plant);
                    }
                })
             getTotalPrice();
        }
        else setPanierItems([]);
    },[])
    const [activePlantList, setActivePlantList] = useState(getClassiquePlantList());

    useEffect(()=>{
        setActivePlantList(getClassiquePlantList());
    },[plantList])

    const changeActiveCategory = event => {
        setActiveCategory(event.target.value);
        const plantListFiltered = plantList.filter((plant) => {
            return plant.category === event.target.value;
        });
        setActivePlantList(plantListFiltered);
    }
    
    const onReinitialzeClick = () => {
        setActiveCategory('classique');
        setActivePlantList(getClassiquePlantList());
    }
    const onViderClick=()=>{
        setPanierItems([]);
        setTotalPrice(0);
        localStorage.removeItem('panierItems');
    }
    const getAllCategories = () => {
        const categories = plantList.map((plant) => {
            return plant.category;
        });
        // delete duplicate categories
        for(let i=0; i<categories.length; i++){
            for(let j=i+1; j<categories.length; j++){
                if(categories[i]===categories[j]){
                    categories.splice(j,1);
                    j--;
                }
            }
        }
        return categories;
    }
    const getTotalPrice=()=>{
        let total=0;
        panierItems.forEach((plant)=>{
          total+=plant.price*plant.quantity;
        })
        setTotalPrice(total);
      }
    const onAjoutClick = (plant) => {
        let exist=false;
        panierItems.forEach((item)=>{
            if(item.id===plant.id){
                exist=true;
            }
        })
        if(exist){
           // add quantity attribute to plant
              panierItems.find((item)=>{
                if(item.id===plant.id){
                  item.quantity+=1;
                }
              })
              setPanierItems([...panierItems]);
        }
        else{
            plant.quantity=1;   
            panierItems.push(plant);
            setPanierItems([...panierItems]);
            //  setPanierItems([panierItems, plant]);
        }
        getTotalPrice();
        localStorage.setItem('panierItems', JSON.stringify(panierItems));
    }
    const getImageFromBytes=(blobData)=>{
        const blob = new Blob([new Uint8Array(blobData)], { type: 'image/jpg' }); 
        const imageUrl =window.URL.createObjectURL(blob);
        return imageUrl;
    }

    return(
        <div className="section">
            <Cart panierItems={panierItems} totalPrice={totalPrice} onViderClick={onViderClick}/>
            <div className="containercateg_shop">
                <Categories activeCategory={activeCategory} getAllCategories={getAllCategories} onReinitialzeClick={onReinitialzeClick} changeActiveCategory={changeActiveCategory}/>
                <ShoppingList getImageFromBytes={getImageFromBytes} activePlantList={activePlantList} onAjoutClick={onAjoutClick} />
            </div>
        </div>
    )
}
export default Section;
