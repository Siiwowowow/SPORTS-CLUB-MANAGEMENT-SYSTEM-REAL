import {
    createBrowserRouter,
  } from "react-router";
import MainLayout from "../Layout/MainLayout/MainLayout";
import Home from "../Component/Home/Home";
import Signup from "../Component/Authentication/Signup/Signup";
import Login from "../Component/Authentication/Login/Login";
import GameCourt from "../Component/GameCourt/GameCourt";
 export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children:[
        {
          path:'/',
          index:true,
          element:<Home></Home>,
          loader:()=>fetch('./location.json')
        },
        {
          path:'/by-courts',
          element:<GameCourt></GameCourt>,
          loader:()=>fetch(`${import.meta.env.VITE_API_URL}/allCourts`)
        },
        {
          path:'/register',
          element:<Signup></Signup>
        },
        {
          path:'/login',
          element:<Login></Login>
        },
      ]
    },
  ]);