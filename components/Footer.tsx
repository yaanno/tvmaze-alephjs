import { Link } from "aleph/react"

export default function Footer() {
  return (
    <footer className="w-full text-lg">
      <div className="border-t-1 max-w-7xl m-auto pt-4 flex flex-col md:flex-row gap-4 justify-between">
        <div className="">
          <p>Follow us on social media</p>
          <p className="text-sm">© TVmaze.com</p>
        </div>
        <div className="">
          <ul className="flex flex-col sm:flex-row gap-x-4">
            <li>
              <Link to="/">Features</Link>
            </li>
            <li>
              <Link to="/">API</Link>
            </li>
            <li>
              <Link to="/">Blog</Link>
            </li>
            <li>
              <Link to="/">Request a Show</Link>
            </li>
            <li>
              <Link to="/">Data Policies</Link>
            </li>
          </ul>
          <ul className="flex flex-col sm:flex-row gap-x-4">
            <li>
              <Link to="/">Copyright Policy</Link>
            </li>
            <li>
              <Link to="/">Privacy Policy</Link>
            </li>{" "}
            <li>
              <Link to="/">ToS</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
