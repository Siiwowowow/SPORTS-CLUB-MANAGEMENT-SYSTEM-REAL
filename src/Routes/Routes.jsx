import {
  createBrowserRouter,
} from "react-router";
import MainLayout from "../Layout/MainLayout/MainLayout";
import Home from "../Component/Home/Home";
import Signup from "../Component/Authentication/Signup/Signup";
import Login from "../Component/Authentication/Login/Login";
import GameCourt from "../Component/GameCourt/GameCourt";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import ErrorPage from "../Pages/Share/ErrorPage/ErrorPage";
import DashBoardLayout from "../Layout/DashBoard/DasBoardlayout/DashBoardLayout";
import DashBoardHome from "../Layout/DashBoard/DashBoardHome/DashBoardHome";
import MyProfile from "../Pages/DashBoardPages/MyProfile";
import PendingBookings from "../Pages/DashBoardPages/PendingBookings";
import Announcements from "../Pages/DashBoardPages/Announcements";
import MemberLayout from "../Layout/MemberDashBoard/MemberLayout/MemberLayout";
import MemberDashHome from "../Layout/MemberDashBoard/MemberDashHome/MemberDashHome";
import MemberProfile from "../Pages/MemberDeshBoardPages/Profile/MemberProfile";
import Pending from "../Pages/MemberDeshBoardPages/Pending/pending";
import Approved from "../Pages/MemberDeshBoardPages/Approved/Approved";
import Confirm from "../Pages/MemberDeshBoardPages/Confirm/Confirm";
import Payment from "../Pages/MemberDeshBoardPages/Payment/Payment";
import AdminDashLayout from "../Layout/AdminDashBoard/AdminDashLayout";
import MainDashBoard from "../Layout/MainDashBoard/MainDashBoard";
import MainDashBoardHome from "../Layout/MainDashBoard/MainDashBoardHome";
import AdminProfile from "../Pages/AdmindashBoardPages/AdminProfile";
import BookingApproval from "../Pages/AdmindashBoardPages/BookingApproval";
import ManageBooking from "../Pages/AdmindashBoardPages/ManageBooking";
import ManageUsers from "../Pages/AdmindashBoardPages/ManageMembers";
import ManageMembers from "../Pages/AdmindashBoardPages/ManageMembers";
import AllUsers from "../Pages/AdmindashBoardPages/AllUsers";
import ManageCourts from "../Pages/AdmindashBoardPages/ManageCourts";
import ManageCupon from "../Pages/AdmindashBoardPages/ManageCupon";
import Announcement from "../Pages/AdmindashBoardPages/Announcement";
import PaymentForm from "../AllForm/PaymentForm/PaymentForm";
import AdminCoupons from "../AllForm/PaymentForm/AdminCoupons";
import DashBoardStats from "../Pages/Share/DashBoardStatus/DashBoardStatus";


export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage></ErrorPage>,
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: '/',
        index: true,
        element: <Home></Home>,
        loader: () => fetch('./location.json')
      },
      {
        path: '/by-courts',
        element: <GameCourt></GameCourt>,
        loader: () => fetch(`${import.meta.env.VITE_API_URL}/allCourts`)
      },

      {
        path: '/register',
        element: <Signup></Signup>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      
      
    ]
  },
  {
    path: '/main-dashboard',
    element: <PrivateRoute><MainDashBoard></MainDashBoard></PrivateRoute>,
    children: [
      {
        path: '/main-dashboard',  
        element: <PrivateRoute><MainDashBoardHome></MainDashBoardHome></PrivateRoute>
      }
      ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><DashBoardLayout></DashBoardLayout></PrivateRoute>,
    children: [
      {
        path: '/dashboard',
        element: <PrivateRoute><DashBoardHome></DashBoardHome></PrivateRoute>
      },
      {
        path: '/dashboard/my-profile',
        element: <PrivateRoute><MyProfile></MyProfile></PrivateRoute>
      },
      {
        path: '/dashboard/pending-bookings',
        element: <PrivateRoute><PendingBookings></PendingBookings></PrivateRoute>
      },
      {
        path: '/dashboard/announcements',
        element: <PrivateRoute><Announcements></Announcements></PrivateRoute>
      },
    ]
  },
  {
    path: '/member-dashboard',
    element: <PrivateRoute><MemberLayout></MemberLayout></PrivateRoute>,
    children: [
      
      
      {
        path: '/member-dashboard',
        element: <PrivateRoute><MemberDashHome></MemberDashHome></PrivateRoute>
      },
      {
        path: '/member-dashboard/member-profile',
        element: <PrivateRoute><MemberProfile></MemberProfile></PrivateRoute>
      },
      {
        path: '/member-dashboard/pending-bookings',
        element: <PrivateRoute><Pending></Pending></PrivateRoute>
      },
      {
        path: '/member-dashboard/approved-bookings',
        element: <PrivateRoute><Approved></Approved></PrivateRoute>
      },
      {
        path: '/member-dashboard/confirmed-bookings',
        element: <PrivateRoute><Confirm></Confirm></PrivateRoute>
      },
      {
          path: '/member-dashboard/payment/:bookingId',
          element: <PrivateRoute><PaymentForm></PaymentForm></PrivateRoute>
      },
      {
        path: '/member-dashboard/payment-history',
        element: <PrivateRoute><Payment></Payment></PrivateRoute>
      },

    ]

  }
  ,
  {
    path: '/admin-dashboard',
    element: <PrivateRoute><AdminDashLayout></AdminDashLayout></PrivateRoute>,
    children: [
      {
       path: '/admin-dashboard/admin-coupons',
       element: <PrivateRoute><AdminCoupons></AdminCoupons></PrivateRoute>
      },
      {
       path: '/admin-dashboard/status',
       element: <PrivateRoute><DashBoardStats></DashBoardStats></PrivateRoute>
      },
      {
        path: '/admin-dashboard',
        element: <PrivateRoute><MemberDashHome></MemberDashHome></PrivateRoute>
      },
      {
        path: '/admin-dashboard/admin-profile',
        element: <PrivateRoute><AdminProfile></AdminProfile></PrivateRoute>
      },
      {
        path: '/admin-dashboard/bookings-approval',
        element: <PrivateRoute><BookingApproval></BookingApproval></PrivateRoute>
      },
      {
        path: '/admin-dashboard/manage-bookings',
        element: <PrivateRoute><ManageBooking></ManageBooking></PrivateRoute>
      },
      {
        path: '/admin-dashboard/manage-members',
        element: <PrivateRoute><ManageMembers></ManageMembers></PrivateRoute>
      },
      {
        path: '/admin-dashboard/all-users',
        element: <PrivateRoute><AllUsers></AllUsers></PrivateRoute>
      },
      {
        path: '/admin-dashboard/manage-courts',
        element: <PrivateRoute><ManageCourts></ManageCourts></PrivateRoute>
      },
      {
        path: '/admin-dashboard/manage-coupons',
        element: <PrivateRoute><ManageCupon></ManageCupon></PrivateRoute>
      },
      {
        path: '/admin-dashboard/announcements',
        element: <PrivateRoute><Announcement></Announcement></PrivateRoute>
      },
      
      
    ]

  }
  ,
]);