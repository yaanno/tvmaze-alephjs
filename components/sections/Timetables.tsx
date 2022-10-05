import { ShowWithChannel } from "../../models/types.ts"

export default function TimeTable({
  shows,
  time,
}: {
  shows: ShowWithChannel[]
  time: string
}) {
  return (
    <div className="">
      <header className="relative p4 bg-slate-500 text-white">{time}</header>
      {shows.map((show) => (
        <div
          key={show.id}
          className="grid grid-cols-10 bg-slate-100 odd:bg-white"
        >
          <div className="col-span-4 lg:col-span-3 md:col-span-2 self-center p-4">
            <div>{show.schedule.time}</div>
            <div>
              <a className="hover:underline" href={show.channel.url}>
                {show.channel.name}
              </a>
            </div>
          </div>
          <div className="col-span-4 lg:col-span-7 md:col-span-3 py-4 px-4 md:px-0 lg:px-4 self-center">
            <h4 className="text-2xl">
              <a className="hover:underline" href={show.url}>
                {show.name}
              </a>
            </h4>
            <p>
              <a className="hover:underline" href={show.episode.url}>
                {show.episode.name}
              </a>
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
