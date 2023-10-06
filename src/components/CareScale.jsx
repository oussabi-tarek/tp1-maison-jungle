import water from "../assets/water.svg";
import light from "../assets/sun.svg";

function CareScale(props){
    const waterLength=JSON.parse(props.props.water);
    const lightLength=JSON.parse(props.props.light);
    return (
        <div className="careScaleContainer">
        <div className="waterScaler">
            {
             Array.from({ length: waterLength }, (_, index) => (
                    <img  src={water}  />
             ))
            }
        </div>
        <div className="lightScaler">
        {
             Array.from({ length: lightLength}, (_, index) => (
                    <img src={light}  />
             ))
            }
        </div>
        </div>
    )
}
export default CareScale;