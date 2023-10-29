import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import Netflix from './Pages/Netflix'
import Player from './Pages/Player'
import MoviePage from './Pages/Movies'
import TVShows from './Pages/TVShows'
export default function App() {
    return ( <
        BrowserRouter >
        <
        Routes >
        <
        Route exact path = "/Login"
        element = { < Login / > }
        /> <
        Route exact path = "/SignUp"
        element = { < SignUp / > }
        /> <
        Route exact path = "/player"
        element = { < Player / > }
        /> <
        Route exact path = "/tv"
        element = { < TVShows / > }
        /> <
        Route exact path = "/movies"
        element = { < MoviePage / > }
        /> <
        Route exact path = "/netflix"
        element = { < Netflix / > }
        /> <
        /Routes> <
        /BrowserRouter>
    );
}