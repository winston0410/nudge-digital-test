import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { IFormData } from '../types/form'

export interface CounterState {
  data: Array<IFormData>
}

const initialState: CounterState = {
  data: [],
}

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    push: (state, action: PayloadAction<IFormData>) => {
      state.data.push(action.payload) 
    },
  },
})

export const { push } = formSlice.actions

export default formSlice.reducer
