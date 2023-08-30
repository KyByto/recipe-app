
import React from "react";
import "../components-style/favMeal.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  {faSquareXmark} from "@fortawesome/free-solid-svg-icons"








export default function favMeal(props) {

return (
   
      


           
            <li onClick={props.displayDetails}>

            <FontAwesomeIcon icon={faSquareXmark} className="Xmark-square-icon" onClick={props.deleteFav} />
            <img alt="recipeimg" src={props.meal.strMealThumb} />


<p>{props.meal.strMeal }</p>


                </li>


              


          
    
)


}