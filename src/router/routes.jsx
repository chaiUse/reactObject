import Home from "../pages/Home/Home";
import RoleManagement from "../pages/Home/chai/RoleManagement/roleManagement";
import Login from "../pages/Login/Login";
import Room from "../pages/Home/Room/Room";
import Students from "../pages/Home/roomStudents/Students";
import PermissionMenu from "../pages/PermissionMenu/PermissionMenu";
import ManagePage from "../pages/userManage/managePage/managePage";
import Personal from "../pages/userManage/personal/personal";
import TestContent from "../pages/Home/testBase/testComtent/TestContent";
import TestKu from "../pages/Home/testBase/testKu/TestKu";
import TestNew from "../pages/Home/testBase/testNew/TestNew";
import Homecon from "../pages/Home/chai/home/home";
import Bank from "../pages/Home/chai/paper/bank";import TestPaper from '../pages/Home/testpaper/testPaper'
import Create from '../pages/Home/testpaper/create/Create'
import StudentSystem from "../pages/Home/studentSystem/StudentSystem"
const routeConfige = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
    children: [
      { path:"studentSystem", element:<StudentSystem />},
      //照这个写路由
      { path: "", element: <Homecon /> },
      { path: "/home/userManage/system", element: <RoleManagement /> },
      { path: "/home/userManage/manage-page", element: <ManagePage /> },
      { path: "/home/userManage/personal", element: <Personal /> },

      { path: "/home/manage-group/group-list", element: <Room /> },
      { path: "/home/manage-group/group-students", element: <Students /> },
      { path: "/home/question/create-subject", element: <TestContent/> },
      { path: "/home/question/item-bank", element: <TestKu/> },
      { path: "/home/question/create-item", element: <TestNew/> },
      { path: "/home/userManage/menuManage", element: <PermissionMenu /> },
      { path: "/home/exam/record", element: <TestPaper /> },
      { path: "/home/exam/create", element: <Create /> },
      
      { path: "/home/paper/paper-bank", element: <Bank /> },
    ],
  },
];
export default routeConfige;
