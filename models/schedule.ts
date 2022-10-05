import type { Schedule, TimeTable } from "./types.ts"
import ScheduleApi from "./api.ts"
import { format } from "std/datetime/mod.ts"

function processTimetableData(data: ScheduleApi.Item[]): TimeTable[] {
  const map = new Map()
  // lazy filtering of empty airtime items
  const withAirTime = data.filter((episode) => episode.airtime != "")
  // k,v grouping of items by `airtime`
  withAirTime.forEach((episode) => {
    if (!map.get(episode.airtime)) {
      map.set(episode.airtime, [episode])
    } else {
      const val = map.get(episode.airtime)
      map.set(episode.airtime, val.append(episode))
    }
  })
  const result = [] as TimeTable[]
  for (const [key, value] of map) {
    const episodes = value.map((episode: ScheduleApi.Item) => {
      {
        const { season, number, airdate, airstamp, id, url, name, _embedded } =
          episode
        const show = _embedded.show
        return {
          episode: {
            name: name,
            url: url,
          },
          season,
          number,
          airdate,
          airstamp,
          id,
          url: show.url,
          name: show.name,
          schedule: show.schedule,
          image: show.image,
          channel: {
            name: show.webChannel.name,
            url: show.webChannel.officialSite,
          },
        }
      }
    })
    result.push({
      time: key,
      shows: episodes,
    })
  }
  return result
}

export function processData(data: ScheduleApi.Item[]) {
  return data.map((e) => {
    const { season, number, airdate, airstamp, id, url, name, _embedded } = e
    const { show } = _embedded

    return {
      season,
      number,
      airdate,
      airstamp,
      id,
      url,
      name,
      show: {
        id: show.id,
        url: show.url,
        name: show.name,
        schedule: show.schedule,
        image: show.image,
      },
    }
  })
}

export async function scheduledTomorrow(): Promise<Schedule> {
  const today = format(new Date(), "yyyy-MM-dd")
  const url = `https://api.tvmaze.com/schedule/web?date=${today}&country=US`
  const response = await fetch(url)
  if (!response.ok) {
    return []
  }
  const data: ScheduleApi.Item[] = await response.json()
  return processData(data)
}

export async function scheduledToday(): Promise<Schedule> {
  const today = format(new Date(), "yyyy-MM-dd")
  const url = `https://api.tvmaze.com/schedule/web?date=${today}&country=US`
  const response = await fetch(url)
  if (!response.ok) {
    return []
  }
  const data: ScheduleApi.Item[] = await response.json()

  // preprocess data
  return processData(data)
}

export async function scheduledTimeTable(): Promise<TimeTable[]> {
  const today = format(new Date(), "yyyy-MM-dd")
  const url = `https://api.tvmaze.com/schedule/web?date=${today}&country=US`
  const response = await fetch(url)
  if (!response.ok) {
    return []
  }
  const data: ScheduleApi.Item[] = await response.json()
  return processTimetableData(data)
}

export async function getTimeTable() {
  return await [
    {
      time: "20:00",
      shows: [
        {
          schedule: { time: "20:00" },
          channel: { name: "ABC", url: "/abcd" },
          name: "Bachelor in Paradise 1",
          url: "/bachelor-in-paradise-1",
          episode: {
            name: "Episode 3",
            url: "/",
          },
        },
        {
          schedule: { time: "20:00" },
          channel: { name: "ABC", url: "/abcde" },
          name: "Bachelor in Paradise 1",
          url: "/bachelor-in-paradise-2",
          episode: {
            name: "Episode 3",
            url: "/",
          },
        },
        {
          schedule: { time: "20:00" },
          channel: { name: "ABC", url: "/abcef" },
          name: "Bachelor in Paradise 1",
          url: "/bachelor-in-paradise-3",
          episode: {
            name: "Episode 3",
            url: "/",
          },
        },
      ],
    },
    {
      time: "21:00",
      shows: [
        {
          schedule: { time: "21:00" },
          channel: { name: "ABC", url: "/abcsdf" },
          name: "Bachelor in Paradise 1",
          url: "/bachelor-in-paradise-4",
          episode: {
            name: "Episode 3",
            url: "/",
          },
        },
        {
          schedule: { time: "21:10" },
          channel: { name: "ABC", url: "/abcfgh" },
          name: "Bachelor in Paradise 1",
          url: "/bachelor-in-paradise-5",
          episode: {
            name: "Episode 3",
            url: "/",
          },
        },
        {
          schedule: { time: "21:20" },
          channel: { name: "ABC", url: "/abcqweqwe" },
          name: "Bachelor in Paradise 1",
          url: "/bachelor-in-paradise-6",
          episode: {
            name: "Episode 3",
            url: "/",
          },
        },
      ],
    },
  ]
}
