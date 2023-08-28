

import React from "react"
import "../components-style/searchBar.css"
export default function SearchBar({dispatch}) {
    const [inputValue, setInputValue] = React.useState("");

    function updateInput(event) {
        const {value} = event.target;
       setInputValue(value)
      
        }
        async function searchMeal(event) {
            event.preventDefault();
            
            const response = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + inputValue);
            const data = await response.json();
            dispatch({type:"meal", payload:data.meals})
            
            
            }
    return (
        <form className="search-bar-form"  onSubmit={(e) =>searchMeal(e)} >
            <input
             
              type="text"
             onChange={(e) =>updateInput(e)}
             value={inputValue} 
         
            
            />
            </form>
    )
}