// Redux Slice: searchBarSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state type
interface SearchBarState {
  query: string;
  filterByRating: boolean;
}

// Define the initial state
const initialState: SearchBarState = {
  query: "", // Initial query value
  filterByRating: false,
};

const searchBarSlice = createSlice({
  name: "searchBar",
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload; // Update the query
    },
    removeQuery: (state) => {
      state.query = ""; // Reset the query
    },
    setFilterByRating: (state, action: PayloadAction<boolean>) => {
      state.filterByRating = action.payload;
    },
  },
});

// Export actions
export const { setQuery, removeQuery, setFilterByRating } =
  searchBarSlice.actions;

// Export reducer
export default searchBarSlice.reducer;
