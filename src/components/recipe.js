

import React from "react"

import "../components-style/recipe.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'




export default function Recipe(props) {
   
  
return (
   
        <section onClick={props.displayDetails} className="recipe">
        
        <img src={props.img} 
        alt="img"/>
        
        <figcaption>
            <p className="title">{props.name}</p>
            <div className="icon-wrapper">

   
  <i
  onClick={props.toggleFav} 

  className={`fa-heart  ${props.colored ? "fa-solid colored" : "fa-regular"}`} >                
  </i>


    

           
           
        </div>
            </figcaption>
        
        </section>
          



)



}
