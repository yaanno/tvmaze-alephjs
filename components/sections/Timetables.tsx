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
      <header className="p4 bg-slate-500 text-white">{time}</header>
      {shows.map((show) => (
        <div
          key={show.id}
          className="grid grid-cols-10 bg-slate-100 odd:bg-white p-4"
        >
          <div className="col-span-3 lg:col-span-3 sm:col-span-4 self-start">
            <div className="lh-8">{show.schedule.time}</div>
            <div>
              <a className="hover:underline" href={show.channel.url}>
                {show.channel.name}
              </a>
            </div>
          </div>
          <div className="col-span-7 lg:col-span-7 sm:col-span-6 self-start">
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
