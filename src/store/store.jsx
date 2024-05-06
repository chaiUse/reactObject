import { configureStore } from "@reduxjs/toolkit";
import one from "./one";

const store =configureStore({
  reducer:{
    oneStore:one,
  }
})
export default store