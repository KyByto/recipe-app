

import React from "react"
import "../components-style/searchBar.css"
export default function SearchBar(props) {
    

    
       
    return (
        <form className="search-bar-form"  onSubmit={(e) =>props.searchMeal(e)} >
            <input
             
              type="text"
             onChange={(e) =>props.updateInput(e)}
             value={props.inputValue} 
         
            
            />
            </form>
    )
}