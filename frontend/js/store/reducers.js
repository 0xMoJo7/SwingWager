import { combineReducers } from "@reduxjs/toolkit";
import { restCheckReducer } from "./rest_check";
import { leaderboardSlice } from './leaderboard'; 

export const rootReducer = combineReducers({
  restCheck: restCheckReducer, 
  leaderboard: leaderboardSlice.reducer, 
});
