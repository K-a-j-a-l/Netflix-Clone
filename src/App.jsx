import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import Netflix from './Pages/Netflix'
export default function App() {
    return ( <
        BrowserRouter >
        <
        Routes >
        <
        Route exact path = "/Login"
        element = { < Login / > }
        /> <
        Route exact path = "/"
        element = { < SignUp / > }
        /> <
        Route exact path = "/Netflix"
        element = { < Netflix / > }
        /> <
        /Routes> <
        /BrowserRouter>
    )
}