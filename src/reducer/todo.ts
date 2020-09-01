import { Reducer } from "redux";

export const ADD_TODO = 'ADD_TODO' as const;

type TodoAction = {
    type : 'ADD_TODO',
    order : number;
    content : string;
}

type TodoProps = {
    order : number;
    content : string; 
}

type TodoState = {
    todos : TodoProps[];
}

const initialState : TodoState = {
    todos : [],
}

const todo = (state :TodoState = initialState, action :TodoAction) => {
    switch (action.type) {
        case ADD_TODO :
            const order = state.todos[state.todos.length - 1]?.order;
            const newTodo : TodoProps = {
                order : order ?  order + 1 : 1,
                content : action.content,
            }
            return {
                ...state,
                todos : state.todos.concat(newTodo)
            }; 
      default:
        return state;
    }
  }
  
  export default todo;