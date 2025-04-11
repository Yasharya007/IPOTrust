import { createSlice } from "@reduxjs/toolkit";

const selectedIpoSlice = createSlice({
  name: "selectedIpo",
  initialState: {
    ipoId: null,
  },
  reducers: {
    setSelectedIpo: (state, action) => {
      state.ipoId = action.payload;
    },
    clearSelectedIpo: (state) => {
      state.ipoId = null;
    },
  },
});

export const { setSelectedIpo, clearSelectedIpo } = selectedIpoSlice.actions;
export default selectedIpoSlice.reducer;
