import { createSlice } from "@reduxjs/toolkit";


export const one = createSlice({
  name:'one',
  initialState:{
    tit:'测试状态管理',
  },
  reducers:{
    change:(state,action)=>{
      state.tit=action.payload
    }
  }
})
export const {change}=one.actions
export default one.reducer