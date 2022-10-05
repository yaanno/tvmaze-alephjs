import { Head, Link, useData } from "aleph/react"
import Listings from "~/components/sections/Listings.tsx"
import TimeTable from "~/components/sections/Timetables.tsx"
import {
  scheduledTimeTable,
  scheduledToday,
  scheduledTomorrow,
} from "../models/schedule.ts"
import type { Schedule, TimeTable as TimeTableType } from "../models/types.ts"

interface Store {
  popularShows?: Schedule
  upComingShows?: Schedule
  timeTables?: TimeTableType[]
}

export const data: Data = {
  get: async () => {
    const promises = [
      scheduledToday(),
      scheduledTomorrow(),
      scheduledTimeTable(),
    ]
    const results = await Promise.all(promises)
    return {
      popularShows: results[0],
      upComingShows: results[1],
      timeTables: results[2],
    }
  },
}

export default function Index() {
  const {
    data: { popularShows, upComingShows, timeTables },
  } = useData<Store>()
  return (
    <div className="w-full my-4">
      <Head>
        <title>TV Maze</title>
        <meta name="description" content="TV Maze" />
      </Head>

      <div className="max-w-7xl grid grid-cols-3 gap-8 m-auto">
        <main className="col-span-3 md:col-span-2 px-4 md:pr-0">
          <h2 className="text-3xl mb-5">Popular shows airing tonight</h2>

          {popularShows ? (
            <>
              <Listings episodes={popularShows} />
              <div className="my-4 text-center">
                <Link
                  className="px-4 py-2 border-1 rounded-full inline-flex hover:bg-gray-400 hover:text-white"
                  to="/"
                >
                  More shows
                </Link>
              </div>
            </>
          ) : null}

          <h2 className="text-3xl mb-5">Upcoming Season Premieres</h2>
          {upComingShows ? (
            <>
              <Listings episodes={upComingShows} />
              <div className="my-4 text-center">
                <Link
                  className="px-4 py-2 border-1 rounded-full inline-flex hover:bg-gray-400 hover:text-white"
                  to="/"
                >
                  Countdown
                </Link>
              </div>
            </>
          ) : null}
          <h2 className="text-3xl">Latest Blogs, Articles and News</h2>
          <div className="my-4 text-center">
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
        <aside className="col-span-3 md:col-span-1 sm:pr-4">
          <h3 className="text-2xl mb-5 text-center sm:text-left">
            Schedule for Oct 03
          </h3>
          {timeTables &&
            timeTables.map((timeTable) => (
              <TimeTable
                key={timeTable.time}
                time={timeTable.time}
                shows={timeTable.shows}
              />
            ))}
          <div className="text-center mt-4">
            <Link
              className="p-4 border-1 rounded-full inline-flex hover:bg-gray-400 hover:text-white"
              to="/"
            >
              View detailed schedule
            </Link>
          </div>
          <h3 className="text-2xl mb-4">Recently added shows</h3>
          <div className="mb-4"></div>
        </aside>
      </div>
    </div>
  )
}
