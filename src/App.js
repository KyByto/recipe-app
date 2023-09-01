
import './App.css';
import SearchBar from "./components/searchBar.js"
import FavMeal from './components/favMeal'
import Recipe from "./components/recipe.js"
import RecipeDetails from "./components/recipeDetails"
import {  useEffect ,useReducer} from "react"

import useRecipe from "./useRecipe"


const initialState = {
meal:[],
mealDetails:null,
details:false,
favMeal:(JSON.parse(localStorage.getItem("favMeal"))) || [] ,
inputValue:""
}


function App() {

const {state,  displayDetails  ,exitDetails  ,toggleFav,fetchData,updateInput,searchMeal} = useRecipe(initialState)
useEffect(  () => {
  fetchData();

},[] )

  return (
    <>
    { state.details ? <RecipeDetails
    meal={state.mealDetails}
    exitDetails={exitDetails}
   
    
    /> :  
     <main className="container">
     <SearchBar 
       inputValue={state.inputValue}
       searchMeal={searchMeal}
      updateInput={updateInput}

        />
     <section className="fav-meal">
      <h1>Favorite Meals</h1>
      <ul className="fav-list">
   {state.favMeal.map( (recipe,index)  => 
 <FavMeal
 key={index}
 
 meal={recipe}
 deleteFav={() =>toggleFav(index,true)}
   displayDetails={() =>displayDetails(recipe)} />

   )}
     </ul>
    </section>
     
      { state.meal &&  state.meal.map( (recipe,index)  => 
       <Recipe 
       toggleFav={() =>toggleFav(index,false)}
        displayDetails={() =>displayDetails(recipe)} 
        name={recipe.strMeal} 
        img={recipe.strMealThumb}
         key={index}
         colored={state.favMeal.find( (favorite) => favorite===recipe   )}
       
          />  ) }
     
     
           </main>  }
</>
  
  );
}

export default App;
