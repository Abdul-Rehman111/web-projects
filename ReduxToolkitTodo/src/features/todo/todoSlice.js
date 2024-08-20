import { createSlice,nanoid } from "@reduxjs/toolkit";
//nanoid variable creates unique ids

/*initialState could be an array or a variable its your choice but i 
am using an object in initail state*/
const initialState={
    todos:[]
    //todos:[{id:1,text:"Hello World"}]
}

/*Now we are making a slice and it is almost like a reducer and what is a reducer
 it also na functionality nothing else*/


 
 export const todoSlice=createSlice({
    name:'todo',
    initialState,
    //properties and functions are written in reducers

    /*In context API we only declare functions not writing its definition but in 
ReduxToolkit we not only declare the function but also writes its declaration*/

/*whenever you use addTodo two things are acessible state and action this is a
 syntax you had to remember it*/

//State will gives you the acess of the initial values which he had initialstate had in it

/*action is defined as whenever we had values and we want to call them action 
hold those values*/
   
reducers:{
        addTodo:(state,action)=>{

            const todo={
                //id is always unique thats why we use nanoid but you also use Date.now()
                //payload is an object
                id:nanoid(),
                text:action.payload
            }
            state.todos.push(todo)
        },
        removeTodo:(state,action)=>{
            //we are overwriting the todo so we remove it
            //filter function always gives us true values
            state.todos=state.todos.filter((todo)=>todo.id!==action.payload)
        },
    }
 })


 export const{addTodo,removeTodo}=todoSlice.actions

 /*The store also needs awareness of all the values otherwise it donot maintains the the
  store donot update all the values it only updates those values which reducers are 
  registered in store thats why store needs all the lists of reducers*/

  /*You had to export all the reducers which you had used because they are used in 
  components*/
  export default todoSlice.reducer

