import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "user",
  initialState: {
    tit: "测试状态管理",
  },
  reducers: {
    change: (state, action) => {
      state.tit = action.payload;
    },
  },
});
