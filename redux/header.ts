import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface HeaderState {
  title: string,
  description: string
}

const initialState: HeaderState = {
  title: "",
  description: ""
}

export const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<HeaderState>) => {
        state.title = action.payload.title
        state.description = action.payload.description
    },
  },
})

export const { set } = headerSlice.actions

export default headerSlice.reducer
