import Home from "../pages/Home/Home";
import RoleManagement from "../pages/Home/chai/RoleManagement/roleManagement";
import Login from "../pages/Login/Login";

const routeConfige=[
  {
    path:'/',
    element: <Login />
  },
  {
    path:'/home',
    element: <Home />,
    children:[
      {
        path:'/home/roleManagement',
        element:<RoleManagement />
      }
    ]
  },
  {
    path:'*',
    element: <div>404</div>
  },
]
export default routeConfige