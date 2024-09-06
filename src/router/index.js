import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AuthRouter } from "@/apis/AuthRouter";


const Book = lazy(() => import("@/pages/Book"))
const BookAdd = lazy(() => import("@/pages/Book/BookAdd"))
const BookEdit = lazy(() => import("@/pages/Book/edit/[id]"))
const Borrow = lazy(() => import("@/pages/Borrow"))
const BorrowAdd = lazy(() => import("@/pages/Borrow/BorrowAdd"))
const User = lazy(() => import("@/pages/User"))
const UserAdd = lazy(() => import("@/pages/User/UserAdd"))
const UserEdit = lazy(() => import("@/pages/User/edit/[id]"))
const Login = lazy(() => import("@/pages/Login"))
const Layout = lazy(() => import("@/apis/Layout"))
const NotFound = lazy(() => import("@/apis/NotFound"))
const router = createBrowserRouter([
    {
        path: '/login',
        element: <Suspense fallback={"加载中"}><Login /></Suspense>
    },
    {
        path: '/',
        element: <AuthRouter><Suspense fallback={"加载中"}><Layout /></Suspense></AuthRouter>,
        children: [

            {
                path: '/book',
                element: <Suspense fallback={"加载中"}><Book /></Suspense>,
            },

            {
                path: '/book/add',
                element: <Suspense fallback={"加载中"}><BookAdd /></Suspense>
            },
            {
                path: '/book/edit/:id',
                element: <Suspense fallback={"加载中"}><BookEdit /></Suspense>
            },


            {
                path: '/borrow',
                element: <Suspense fallback={"加载中"}><Borrow /></Suspense>,
            },
            {
                path: '/borrow/add',
                element: <Suspense fallback={"加载中"}><BorrowAdd /></Suspense>
            },
            {
                path: '/user',
                element: <Suspense fallback={"加载中"}><User /></Suspense>,
            },
            {
                path: '/user/add',
                element: <Suspense fallback={"加载中"}><UserAdd /></Suspense>
            },
            {
                path: '/user/edit/:id',
                element: <Suspense fallback={"加载中"}><UserEdit /></Suspense>
            }


        ]
    },

    {
        path: '*',
        element: <Suspense fallback={"加载中"}><NotFound /></Suspense>
    }

])
export default router