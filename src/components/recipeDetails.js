
import React from "react"

import "../components-style/popup.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
 import { faXmark } from '@fortawesome/free-solid-svg-icons'
export default function recipeDetails(props) {
    const mealIngredient=[];
    for(let i=1;i<=20;i++)  {
         const ingredient = props.meal['strIngredient' + i];
        const measure = props.meal['strMeasure' + i]; 
        if(ingredient) {
            
 mealIngredient.push(`${ingredient} - ${measure}`)
 
        }
        else {
            break;
        }
    }
    

return (

<main className="recipeDetails-container">

<section className="popup">
<FontAwesomeIcon icon={faXmark} className="Xmark-icon" onClick={props.exitDetails} />
<h1 className="recipeDetails-title">{props.meal.strMeal}</h1>


<img src={props.meal.strMealThumb}
alt="image" />
<p>{props.meal.strInstructions}</p>

<div className="ingredient">
    <h2>Ingredients:</h2>
    <ul>
 { mealIngredient.map(  (ing,index) => <li key={index}>{ing}</li>   ) }

</ul>
</div>









</section>


    </main>


)



}