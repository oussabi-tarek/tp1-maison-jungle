
import '../styles/Section.css'

function Categories(props){
    return(
        <div className="containerCategories">
            <select onChange={props.changeActiveCategory}>
                <option value="Choose a category">Choose a category</option>
                {
                    props.getAllCategories().map((category, index) =>{
                        return  category===props.activeCategory ?  <option key={index} value={category} selected>{category}</option> 
                        : <option key={index} value={category}>{category}</option>
                    })
                }
            </select>
            <button className="reinitialiser" onClick={props.onReinitialzeClick}>Reinitialiser</button>
        </div>
    )
}
export default Categories;