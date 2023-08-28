
import './App.css';
import SearchBar from "./components/searchBar.js"
import FavMeal from './components/favMeal'
import Recipe from "./components/recipe.js"
import RecipeDetails from "./components/recipeDetails"
import {  useEffect ,useReducer } from "react"

function Reducer(state,action) {


  switch (action.type) {
      case "favMeal":
          return { ...state, favMeal: action.payload || []   }
          
        
          case "meal":
            return {...state, meal: action.payload}
        
          
            
           case "details":
            return {...state, details:action.payload}
           
            case "mealDetails":
              return {...state, mealDetails:action.payload}
             

     default:
      break;
  }
  
  }


const initialState = {
meal:[],
mealDetails:null,
details:false,
favMeal:[] 

}

// for search ("https://www.themealdb.com/api/json/v1/1/search.php?s=" + search")
function App() {

const [state, dispatch] = useReducer( Reducer, initialState     )

useEffect(  () => {

const response = localStorage.getItem("favMeal");
console.log("inside useEffect")
const parsedData= JSON.parse(response);
dispatch( { type:"favMeal" , payload :parsedData } )
fetchData();

},[] )



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


function deleteFav(index) {
const arr= state.favMeal.filter(  (_,i) => i!==index    );
dispatch({type:"favMeal",payload:arr})

localStorage.setItem("favMeal",   JSON.stringify( arr));

}

function toggleFav(index) {
  

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



  return (
    <>
    { state.details ? <RecipeDetails
    meal={state.mealDetails}
    exitDetails={exitDetails}
   
    
    /> :  
     <main className="container">
     <SearchBar 
       
       
      dispatch={dispatch}

        />
     <section className="fav-meal">
      <h1>Favorite Meals</h1>
      <ul className="fav-list">
   {state.favMeal.map( (recipe,index)  => 
 <FavMeal
 key={index}
 
 meal={recipe}
 deleteFav={() =>deleteFav(index)}
   displayDetails={() =>displayDetails(recipe)} />

   )}
     </ul>
    </section>
     
      { state.meal &&  state.meal.map( (recipe,index)  => 
       <Recipe 
       toggleFav={() =>toggleFav(index)}
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
