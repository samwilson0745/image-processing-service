// src/reducers/imageUrlSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ImageUrlState {
  url: string ;
  width: number ;
  height: number
}

const initialState: ImageUrlState = {
  url: "",
  width: 0,
  height: 0
};

const imageUrlSlice = createSlice({
  name: 'imageUrl',
  initialState,
  reducers: {
    setImageUrl: (state, action: PayloadAction<string>) => {
      state.url = action.payload;
    },
    setHeight: (state,action:PayloadAction<number>)=>{
      state.height = action.payload
    },
    setWidth: (state, action: PayloadAction<number>)=>{
      state.width = action.payload
    }
  },
});

export const { setImageUrl } = imageUrlSlice.actions;
export default imageUrlSlice.reducer;