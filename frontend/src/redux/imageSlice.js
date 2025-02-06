import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedImage: null, // Ensure this is set to null or a default value
  };
  
  const imageSlice = createSlice({
    name: "images",
    initialState,
    reducers: {
      setSelectedImage: (state, action) => {
        state.selectedImage = action.payload; // Update image
      },
    },
  });
  
  export const { setSelectedImage } = imageSlice.actions;
  
  export default imageSlice.reducer;
