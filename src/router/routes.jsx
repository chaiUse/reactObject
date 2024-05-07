import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Room from "../pages/Home/Room/Room";

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
        path:'/home/room',
        element:<Room />
      }
    ]
  }
]
export default routeConfige