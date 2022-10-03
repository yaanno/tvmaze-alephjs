import { Head, Link } from "aleph/react"

const Programmes = [
  {
    time: "20:00",
    channel: { name: "ABC", link: "/abc" },
    show: { title: "Bachelor in Paradise 1", link: "/bachelor-in-paradise" },
    episode: "Episode 3",
  },
  {
    time: "20:10",
    channel: { name: "ABC", link: "/abc" },
    show: { title: "Bachelor in Paradise 2", link: "/bachelor-in-paradise" },
    episode: "Episode 3",
  },
  {
    time: "20:30",
    channel: { name: "ABC", link: "/abc" },
    show: { title: "Bachelor in Paradise 3", link: "/bachelor-in-paradise" },
    episode: "Episode 3",
  },
]

export default function Index() {
  return (
    <div className="w-full my-4">
      <Head>
        <title>TV Maze</title>
        <meta name="description" content="TV Maze" />
      </Head>

      <div className="max-w-7xl grid grid-cols-3 gap-1 m-auto">
        <main className="col-span-2">
          <h2 className="text-3xl">Popular shows airing tonight</h2>
          <div>{/* Pop show cards */}</div>
          <div className="mt-4">
            <Link
              className="px-4 py-2 border-1 rounded-full inline-flex hover:bg-gray-400 hover:text-white"
              to="/shedules"
            >
              More shows
            </Link>
          </div>
          <h2 className="text-3xl">Upcoming Season Premieres</h2>
          <div>{/* Upcoming Season cards */}</div>
          <div className="mt-4">
            <Link
              className="px-4 py-2 border-1 rounded-full inline-flex hover:bg-gray-400 hover:text-white"
              to="/shedules"
            >
              Countdown
            </Link>
          </div>
          <h2 className="text-3xl">Latest Blogs, Articles and News</h2>
          <div className="mt-4">
            <Link
              role="link"
              className="px-4 py-2 border-1 
              rounded-full inline-flex hover:bg-gray-400 hover:text-white"
              to="/shedules"
            >
              Blogs
            </Link>
          </div>
        </main>
        <aside>
          <h3 className="text-2xl mb-4">Schedule for Oct 03</h3>
          <div className="mb-4">
            <header className="p4 bg-gray-800 text-white">20:00</header>
            {Programmes.map((p) => (
              <div
                key={p.show.title}
                className="grid grid-cols-4 bg-gray-100 odd:bg-white border-1"
              >
                <div className="col-span-1 p4 self-center">
                  <div>{p.time}</div>
                  <div>
                    <Link className="hover:underline" to={p.channel.link}>
                      {p.channel.name}
                    </Link>
                  </div>
                </div>
                <div className="col-span-3 p4 self-center">
                  <h4 className="text-2xl">
                    <Link className="hover:underline" to={p.show.link}>
                      {p.show.title}
                    </Link>
                  </h4>
                  <p>{p.episode}</p>
                </div>
              </div>
            ))}
            <div className="text-center mt-4">
              <Link
                className="p-4 border-1 rounded-full inline-flex hover:bg-gray-400 hover:text-white"
                to="/shedules"
              >
                View detailed schedule
              </Link>
            </div>
          </div>
          <h3 className="text-2xl mb-4">Recently added shows</h3>
          <div className="mb-4"></div>
        </aside>
      </div>
    </div>
  )
}
