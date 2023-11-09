import Cart from "./Cart";
import Categories from "./Categories";
import ShoppingList from "./ShoppingList";
import "../styles/Section.css";
import { useEffect, useState } from "react";
import { useGetPlants } from "../hooks/plant/useGetPlants";
import { useAddCommand } from "../hooks/command/useAddCommand";
import Login from "./Login";
import { ENDPOINTS } from "../hooks/endpoints";
import {useAxios } from "../hooks/axios/useAxios";

function Section(props){
    const [activeCategory, setActiveCategory] = useState('classique');
    const [panierItems, setPanierItems] = useState([]); 
    const [saved, setSaved] = useState(false);
    const axiosInstance = useAxios();
    const [totalPrice, setTotalPrice] = useState(0);
    const [showLogin, setshowLogin] = useState(false); 
    const [badCredentials, setbadCredentials] = useState(false);
    const {plantList}=useGetPlants();
    const {saveCommand}=useAddCommand();
    

    const getClassiquePlantList = () => {
        const plantListFiltered = plantList.filter((plant) => {
            return plant.category.label === 'classique';
        }
        );
      return plantListFiltered;
    }
    const onSaveCartClick=()=>{
        if(JSON.parse(localStorage.getItem('userInfos'))==null) {
          setshowLogin(true);
        }
        else{
            const items=[];
            panierItems.forEach((item)=>{
                items.push({id:item._id,quantity:item.quantity});
            })
            if(items.length>0){
            const email=JSON.parse(localStorage.getItem('userInfos')).email;
            const commandToSave={email,items};
            saveCommand(commandToSave);
            onViderClick();
            setSaved(true);
            setTimeout(()=>{
                setSaved(false);
            },2000)
            }
        }
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
            return plant.category.label === event.target.value;
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
            return plant.category.label;
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
    const onSaveUserInfosClick=async(event)=>{
        event.preventDefault();
        const userToLogin={email:event.target.email.value,password:event.target.password.value};
        axiosInstance.post(ENDPOINTS.USER,userToLogin)
            .then((res)=>{
             if(res.data.length>0){
                setbadCredentials(false);
                props.setLoggedIn(true);
                const fullName=res.data[0].fullName;
                const email=res.data[0].email;
                const address=res.data[0].address;
                const phone=res.data[0].phone;
                const userInfos={fullName,email,address,phone,loggedIn:true};
                localStorage.setItem('userInfos',JSON.stringify(userInfos));
                setshowLogin(false);
                const items=[];
                panierItems.forEach((item)=>{
                    items.push({id:item._id,quantity:item.quantity});
                })
                if(items.length>0){
                const commandToSave={email,items};
                saveCommand(commandToSave);
                onViderClick();
                setSaved(true);
                    setTimeout(()=>{
                        setSaved(false);
                    },2000)
                }
              }
              else{
                setbadCredentials(true);
              } 
            })
            .catch((err)=>{
            console.log(err)
        })
 
    }

    return(
        <div className="sectionContainer">
        <div className="section">
            <Cart saved={saved} panierItems={panierItems} totalPrice={totalPrice} onSaveCartClick={onSaveCartClick} onViderClick={onViderClick}/>
            <div className="containercateg_shop">
                <Categories activeCategory={activeCategory} getAllCategories={getAllCategories} onReinitialzeClick={onReinitialzeClick} changeActiveCategory={changeActiveCategory}/>
                <ShoppingList getImageFromBytes={getImageFromBytes} activePlantList={activePlantList} onAjoutClick={onAjoutClick} />
            </div>
            </div>
        {showLogin && panierItems.length>0  && <div className="register">
        <Login onSaveUserInfosClick={onSaveUserInfosClick} badCredentials={badCredentials}/>
        </div>
        }
        </div>
    )
}
export default Section;
