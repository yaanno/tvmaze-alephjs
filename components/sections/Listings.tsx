import { Link } from "aleph/react"
import type { Episode } from "../../models/types.ts"

export default function Listings({ episodes }: { episodes: Episode[] }) {
  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        {episodes.map((episode) => (
          <div
            key={episode.id}
            className="col-span-4 sm:col-span-2 lg:col-span-1 text-center"
          >
            <a target="blank  " href={episode.url}>
              <img
                alt={episode.name}
                className="rounded shadow inline-flex object-fill w-full"
                src={episode.show.image?.medium}
              />
            </a>
            <h4 className="text-2xl">
              <Link to={episode.show.url}>{episode.show.name}</Link>
            </h4>
            <p>
              <Link to={episode.url}>{episode.name}</Link>
            </p>
          </div>
        ))}
      </div>
    </>
  )
}
