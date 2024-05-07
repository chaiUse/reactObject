import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import { lazy } from "react";
const TestDetail = lazy(() => import('../pages/Home/studentSystem/testDetail'))
const TestList = lazy(() => import('../pages/Home/studentSystem/testList'))
const OverTest = lazy(() => import('../pages/Home/studentSystem/overTest'))
const routeConfige=[
  {
    path:'/',
    element: <Login />
  },
  {
    path:'/home',
    element: <Home />,
    children:[
      { path:'testDetail', element:<TestDetail /> },
      { path:'testList', element:<TestList /> },
      { path:'overTest', element:<OverTest /> }
    ]
  }
]
export default routeConfige