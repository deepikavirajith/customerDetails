import React  from "react";
import spinnerImg from '../assests/images/loading.gif';


let Spinner = () => {

    return(
        <div className='container'> 
        <img src={spinnerImg} alt="" className='spinner d-block m-auto'></img>
        </div>
    )

}
export default Spinner;
