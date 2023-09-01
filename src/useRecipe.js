import Reducer from "./Reducer"
import {useReducer} from "react"

export default function useRecipe(initialState) {

    const [state, dispatch] = useReducer( Reducer, initialState)


    async function fetchData() {
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
        const data = await response.json();
      
        dispatch( {type:"meal", payload :[data.meals[0]]}  )
        
      }
   function displayDetails(recipe) {
      
          dispatch({type:"details", payload:true})
           dispatch({type:"mealDetails", payload:recipe})
      
        }
      
      function exitDetails() {
        dispatch({type:"details", payload:false})
      }
      
      
      function toggleFav(index,deleting) {
        if(deleting) {
       const arr=   state.favMeal.filter( (_,i) => i!==index  );
      dispatch({type:"favMeal",payload:arr});
      localStorage.setItem("favMeal", JSON.stringify(arr));
        }
        else {     
      if(state.favMeal.find(  (recipe) => recipe===state.meal[index]    )) {
        const arr=state.favMeal.filter(  recipe => recipe!==state.meal[index] );
        dispatch({type:"favMeal", payload:arr})     
      localStorage.setItem("favMeal",   JSON.stringify( arr ));     
      }     
      else {     
      const arr= [...state.favMeal, state.meal[index]];
      dispatch({type:"favMeal",payload:arr})
      
      localStorage.setItem("favMeal",   JSON.stringify(arr))    
      }   
        } 
      }

      function updateInput(event) {
        const {value} = event.target;
       dispatch({type:"inputValue", payload:value})
      
        }


        async function searchMeal(event) {
            event.preventDefault();
            
            const response = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + state.inputValue);
            const data = await response.json();
            dispatch({type:"meal", payload:data.meals})
           
            }

return { state,  displayDetails  ,exitDetails  ,toggleFav,fetchData , updateInput , searchMeal}
}