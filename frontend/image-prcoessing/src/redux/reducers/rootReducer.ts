// src/reducers/rootReducer.ts

import { combineReducers } from '@reduxjs/toolkit';
import imageUrlReducer from './imageUrlSlice';

const rootReducer = combineReducers({
  imageUrl: imageUrlReducer,
});

export default rootReducer;