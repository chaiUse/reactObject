import Home from "../pages/Home/Home";
import RoleManagement from "../pages/Home/chai/RoleManagement/roleManagement";
import Login from "../pages/Login/Login";
import Room from "../pages/Home/Room/Room";
import Students from "../pages/Home/Room/Students";
import PermissionMenu from "../pages/PermissionMenu/PermissionMenu";
import ManagePage from "../pages/userManage/managePage/managePage";
import Personal from "../pages/userManage/personal/personal";
import TestContent from "../pages/Home/testBase/testComtent/TestContent";
import TestKu from "../pages/Home/testBase/testKu/TestKu";
import TestNew from "../pages/Home/testBase/testNew/TestNew";

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
    children: [
      { path: "testDetail", element: <TestDetail /> },
      { path: "testList", element: <TestList /> },
      { path: "overTest", element: <OverTest /> },
      //照这个写路由
      { path: "/home/userManage/system", element: <RoleManagement /> },
      { path: "/home/userManage/manage-page", element: <ManagePage /> },
      { path: "/home/userManage/personal", element: <Personal /> },

      { path: "/home/room", element: <Room /> },
      { path: "/home/students", element: <Students /> },
      { path: "/home/question/create-subject", element: <TestContent/> },
      { path: "/home/question/item-bank", element: <TestKu/> },
      { path: "/home/question/create-item", element: <TestNew/> },
      { path: "permissionMenu", element: <PermissionMenu /> },
    ],
  },
];
export default routeConfige;
