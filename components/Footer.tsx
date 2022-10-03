import { Link } from "aleph/react"

export default function Header() {
  return (
    <footer className="w-full p-4 text-lg">
      <div className="border-t-1 max-w-7xl m-auto pt-4 flex flex-col md:flex-row gap-4 justify-between">
        <div className="">
          <p>Follow us on social media</p>
          <p className="text-sm">© TVmaze.com</p>
        </div>
        <div className="">
          <ul className="flex flex-col sm:flex-row gap-x-4">
            <li>
              <Link to="/features">Features</Link>
            </li>
            <li>
              <Link to="/api">API</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              <Link to="/request">Request a Show</Link>
            </li>
            <li>
              <Link to="/policy">Data Policies</Link>
            </li>
          </ul>
          <ul className="flex flex-col sm:flex-row gap-x-4">
            <li>
              <Link to="/copyright">Copyright Policy</Link>
            </li>
            <li>
              <Link to="/privacy">Privacy Policy</Link>
            </li>{" "}
            <li>
              <Link to="/tos">ToS</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
