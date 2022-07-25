import { combineReducers } from "redux";

// Reducers
import todoReducer from "./features/todolist";

const rootReducer = combineReducers({
  todo: todoReducer,
});

export default rootReducer;
