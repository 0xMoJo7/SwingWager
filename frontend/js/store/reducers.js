import { combineReducers } from "@reduxjs/toolkit";

import { restCheckReducer as restCheck } from "./rest_check";
import { leaderboardSlice as leaderboard } from './leaderboard';

export const rootReducer = combineReducers({
  restCheck,
  leaderboard,
});
