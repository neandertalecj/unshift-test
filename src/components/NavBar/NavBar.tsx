import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <aside className="aside">
      <h1>NavBar</h1>
      <nav className="navigation">
        <div>
          <Link to="/">Posts</Link>
        </div>
        <div>
          <Link to="/create">Create Post</Link>
        </div>
      </nav>
    </aside>
  )
}

export default NavBar
