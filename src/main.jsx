import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './app/store.js'
import './index.css'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import { AuthLayout } from './components/index.js'
import {AddPost, AllPosts, MyPosts, EditPost, Home, Login, SignUp, Post} from './pages/index.js'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App/>}>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={
            <AuthLayout authentication={false}>
            <Login/>
            </AuthLayout>
            }/>
            <Route path='/signup' element={
            <AuthLayout authentication={false}>
            <SignUp/>
            </AuthLayout>
            }/>
            <Route path='/all-posts' element={
            <AuthLayout>
            <AllPosts/>
            </AuthLayout>
            }/>
            <Route path='/my-posts' element={
            <AuthLayout>
            <MyPosts/>
            </AuthLayout>
            }/>
            <Route path='/add-post' element={
            <AuthLayout>
            <AddPost/>
            </AuthLayout>
            }/>
            <Route path='/edit-post/:slug' element={
            <AuthLayout>
            <EditPost/>
            </AuthLayout>
            }/>
            <Route path='/post/:slug' element={
            <AuthLayout>
            <Post/>
            </AuthLayout>
            }/>
        </Route>
    )
)

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
)
