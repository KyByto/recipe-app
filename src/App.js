
import './App.css';
import SearchBar from "./components/searchBar.js"
import FavMeal from './components/favMeal'
import Recipe from "./components/recipe.js"
import RecipeDetails from "./components/recipeDetails"
import React from "react"
//for fetching ("https://www.themealdb.com/api/json/v1/1/random.php")


// for search ("https://www.themealdb.com/api/json/v1/1/search.php?s=" + search")
function App() {
const [meal , setMeal] = React.useState([]);
const [inputValue ,setInputValue] = React.useState("")
const [mealDetails , setMealDetails] = React.useState();
const [details , setdetails] = React.useState(false)
const [favMeal , setFavMeal] = React.useState([])



React.useEffect(  () => {

const response = localStorage.getItem("favMeal");

const parsedData= JSON.parse(response);

setFavMeal( parsedData || [] );

},[] )








React.useEffect(  () => {
  
  async function fetchData() {
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const data = await response.json();
    setMeal([data.meals[0]]);
  }

  fetchData();
    
}, [] );



function updateInput(event) {
  const {value} = event.target;
  setInputValue(value)
  }
  
  async function searchMeal(event) {
  event.preventDefault();
  setInputValue("");
  const response = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + inputValue);
  const data = await response.json();
  
  setMeal(data.meals);
  
  }

  function displayDetails(recipe) {



    
setdetails(true);
setMealDetails(recipe)
  }
function exitDetails() {
  setdetails(false);
}

function addFav(index) {
 
setFavMeal( (prev) => [...prev , meal[index]]   );
localStorage.setItem("favMeal",   JSON.stringify([...favMeal , meal[index]]))

}
function deleteFav(index) {

setFavMeal(  (prev) =>  prev.filter( (_,i) =>  i!==index   ))
localStorage.setItem("favMeal",   JSON.stringify(  favMeal.filter( (_,i) =>  i!==index )));



}

function toggleFav(index) {
  

if(favMeal.find(  (recipe) => recipe===meal[index]    )) {
setFavMeal(   (prev) => prev.filter(  recipe => recipe!=meal[index]    )     );
localStorage.setItem("favMeal",   JSON.stringify(   favMeal.filter(  recipe => recipe!=meal[index]   )));

}

else {


setFavMeal(    (prev) =>  [...prev , meal[index]]  );

localStorage.setItem("favMeal",   JSON.stringify([...favMeal , meal[index]]))

}




}







;


  return (
    <>
    { details ? <RecipeDetails
    meal={mealDetails}
    exitDetails={exitDetails}
   
    
    /> :  
     <main className="container">
     <SearchBar 
       
       updateInput={(event) => updateInput(event)}
       searchMeal={(event) =>searchMeal(event)}
       inputValue={inputValue}    />
     <section className="fav-meal">
      <h1>Favorite Meals</h1>
      <ul className="fav-list">
   {favMeal.map( (recipe,index)  => 
 <FavMeal
 key={index}
 
 meal={recipe}
 deleteFav={() =>deleteFav(index)}
   displayDetails={() =>displayDetails(recipe)} />

   )}
     </ul>
    </section>
     
      { meal &&  meal.map( (recipe,index)  => 
       <Recipe 
       toggleFav={() =>toggleFav(index)}
        displayDetails={() =>displayDetails(recipe)} 
        name={recipe.strMeal} 
        img={recipe.strMealThumb}
         key={index}
         colored={favMeal.find( (favorite) => favorite==recipe   )}
       
          />  ) }
     
     
           </main>  }
</>
  
    


  );
}

export default App;
