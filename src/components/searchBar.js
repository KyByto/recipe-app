

import React from "react"
import "../components-style/searchBar.css"
export default function SearchBar(props) {
    return (
        <form className="search-bar-form"  onSubmit={props.searchMeal} >
            <input
             
              type="text"
             onChange={props.updateInput}
             value={props.inputValue} 
         
            
            />
            </form>
    )
}