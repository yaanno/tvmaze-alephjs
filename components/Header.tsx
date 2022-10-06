import { Link, NavLink } from "aleph/react"

const NavItems = ["TV", "Streaming", "Schedule", "Upcoming"]

export default function Header() {
  return (
    <header className="w-full bg-slate-700">
      <div className="max-w-7xl m-auto">
        <h1 className="text-4xl text-white p-4">Not.Tv.Maze</h1>
      </div>
      <nav className="bg-slate-500">
        <ul className="max-w-full lg:max-w-7xl m-auto flex flex-row flex-wrap">
          {NavItems.map((item) => (
            <li key={item}>
              <NavLink
                className="hover:bg-slate-700 p4 block text-white"
                to="/"
              >
                {item}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
