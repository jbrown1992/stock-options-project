import { combineReducers } from "redux";
import { option } from "./option";
import { stock } from "./stock";


export const reducers = combineReducers({
    option, stock
})