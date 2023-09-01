export default function Reducer(state,action) {


    switch (action.type) {
        case "favMeal":
            return { ...state, favMeal: action.payload || []   }
            
          
            case "meal":
              return {...state, meal: action.payload}
          
            
              
             case "details":
              return {...state, details:action.payload}
             
              case "mealDetails":
                return {...state, mealDetails:action.payload}

                case "inputValue":
                  return {...state, inputValue:action.payload}
               
  
       default:
        break;
    }
    
    }