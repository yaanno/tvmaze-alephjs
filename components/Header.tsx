import { Link, NavLink } from "aleph/react"

const NavItems = [
  "Shows",
  "People",
  "Networks",
  "Web",
  "Channels",
  "Articles",
  "Schedule",
  "Calendar",
  "Countdown",
  "Forums",
]

export default function Header() {
  return (
    <header className="w-full bg-gray-700">
      <div className="max-w-7xl m-auto">
        <h1>TVMAZE</h1>
        <input type="search" />
        <button>Search</button>
        <div>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </div>
      <nav className="bg-gray-500">
        <ul className="max-w-full lg:max-w-7xl m-auto flex flex-row">
          {NavItems.map((item) => (
            <li key={item}>
              <NavLink className="hover:bg-gray-700 p4 block text-white" to="/">
                {item}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
