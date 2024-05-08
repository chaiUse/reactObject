import Home from "../pages/Home/Home";
import RoleManagement from "../pages/Home/chai/RoleManagement/roleManagement";
import Login from "../pages/Login/Login";
import TestBase from "../pages/Home/testBase/TestBase";
import Room from "../pages/Home/Room/Room";
import Students from "../pages/Home/Room/Students";

import { lazy } from "react";
const TestDetail = lazy(() => import("../pages/Home/studentSystem/testDetail"));
const TestList = lazy(() => import("../pages/Home/studentSystem/testList"));
const OverTest = lazy(() => import("../pages/Home/studentSystem/overTest"));
const routeConfige = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
    children:[
      { path:'testDetail', element:<TestDetail /> },
      { path:'testList', element:<TestList /> },
      { path:'overTest', element:<OverTest /> },
      { path:'/home/userManage/system', element:<RoleManagement /> },
      { path:'/home/room',element:<Room />},
      { path:'/home/students', element:<Students />},
      { path: '/home/testBase', element: <TestBase />}
    ]
  }
]
export default routeConfige