import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import TestBase from "../pages/Home/testBase/TestBase";

const routeConfige=[
  {
    path:'/',
    element: <Login />
  },
  {
    path:'/home',
    element: <Home />,
    children: [
      {
        path: '/home/testBase',
        element: <TestBase />
      }
    ]
  }
]
export default routeConfige