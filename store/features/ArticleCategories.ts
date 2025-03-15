import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Category {
    id: string;
    name: string;
}
const initialState = {
  followingCategories: [] as Category[],
  otherCategories: [] as Category[],
}

export const followingCategoriesSlice = createSlice({
  name: 'followingCategories',
  initialState,
  reducers: {
    addFollowingCategories: (state, action: PayloadAction<Category[]>) => {state.followingCategories = action.payload},
    addOtherCategories: (state, action: PayloadAction<Category[]>) => {state.otherCategories = action.payload},
  }
})

export const { addFollowingCategories, addOtherCategories } = followingCategoriesSlice.actions;

export default followingCategoriesSlice.reducer