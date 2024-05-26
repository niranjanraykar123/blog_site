import { useState } from 'react'
import axios from './api/axios'

import './index.css'
import Navbar from './pages/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PostList from './pages/PostList'
import { BlogCard } from './components/BlogCard'
import { Post } from './pages/Post'
import { Publish } from './pages/Publish'


function App() {

  const [user, setUser] = useState();
  const getUser = async () => {
    try {
      const url = '/auth/google'
      const response = await fetch(url)
      const data = await response.json()
      setUser(data)
    } catch (error) {

    }
  }
  // setUser(user);
  return (
    < BrowserRouter >
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path='/posts' element={<PostList user={user} setUser={setUser} />} />
        <Route path='/post/:id' element={<Post user={user} />} />
        <Route path="/publish" element={<Publish user={user} />} />
      </Routes>
    </BrowserRouter >
  )
}

export default App
