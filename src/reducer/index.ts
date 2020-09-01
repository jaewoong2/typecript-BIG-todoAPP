import { combineReducers } from "redux";
import theme from './theme'
import todo from './todo'

const rootReducer = combineReducers({
    todo,
    theme
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;