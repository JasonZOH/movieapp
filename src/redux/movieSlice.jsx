import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bannerData: [],
  imageUrl: "",
}

export const movieSlice = createSlice({
  name : 'StreamStudio',
  initialState,
  reducers: {
    setBannerData : (state, action) =>{
      state.bannerData = action.payload;
    },
    setImageUrl : (state, action) => {
      state.imageUrl = action.payload;
    },
  }
})

export const { setBannerData, setImageUrl, setnowPlayingData, setTopRatedData } = movieSlice.actions;

export default movieSlice.reducer;