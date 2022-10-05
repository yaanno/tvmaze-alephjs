import type { Schedule, TimeTable } from "./types.ts"
import TVScheduleApi from "./api.tv.ts"
import { format } from "std/datetime/mod.ts"

function sortByTime(items: TVScheduleApi.Item[], order = "asc") {
  return items.sort((a1, a2) => {
    if (order === "asc") {
      return Date.parse(a1.airstamp) - Date.parse(a2.airstamp)
    }
    return Date.parse(a2.airstamp) - Date.parse(a1.airstamp)
  })
}

function sortByRating(items: TVScheduleApi.Item[], order = "desc") {
  return items.sort((a1, a2) => {
    if (order === "asc") {
      return Number(a1.show.rating.average) - Number(a2.show.rating.average)
    }
    return Number(a2.show.rating.average) - Number(a1.show.rating.average)
  })
}

function processTimetableData(data: TVScheduleApi.Item[]): TimeTable[] {
  const map = new Map()
  const sorted = sortByTime(data)
  const withAirTime = sorted.map((episode) => {
    if (episode.airtime === "") {
      episode.airtime = format(new Date(episode.airstamp), "HH:mm")
    }
    return episode
  })
  // k,v grouping of items by `airtime`
  withAirTime.forEach((episode) => {
    if (!map.get(episode.airtime)) {
      map.set(episode.airtime, [episode])
    } else {
      const val = map.get(episode.airtime)
      val.push(episode)
      map.set(episode.airtime, val)
    }
  })
  const result = [] as TimeTable[]
  for (const [key, value] of map) {
    const episodes = value.map((episode: TVScheduleApi.Item) => {
      {
        const { season, number, airdate, airstamp, id, url, name, show } =
          episode
        const channel = {
          name: show.network?.name || show.webChannel?.name,
          url: show.network?.officialSite || show.webChannel?.officialSite,
        }
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
          channel,
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

function processData(data: TVScheduleApi.Item[], maxLength = 4) {
  const sorted = sortByRating(data)
  const result = sorted.map((e) => {
    const { season, number, airdate, airstamp, id, url, name, show } = e

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
  return result.slice(0, maxLength)
}

function filterPremiering(data: TVScheduleApi.Item[]) {
  const today = format(new Date(), "yyyy-MM-dd")
  return data.filter((item) => {
    return Date.parse(item.show.premiered) >= Date.parse(today)
  })
}

export async function scheduledToday(): Promise<Schedule> {
  // const today = format(new Date(), "yyyy-MM-dd")
  const url = `https://api.tvmaze.com/schedule?country=US`
  const response = await fetch(url)
  if (!response.ok) {
    return []
  }
  const data: TVScheduleApi.Item[] = await response.json()

  // preprocess data
  return processData(data)
}

export async function upcomingPremieres(): Promise<Schedule> {
  const url = `https://api.tvmaze.com/schedule?country=US`
  const response = await fetch(url)
  if (!response.ok) {
    return []
  }
  const data: TVScheduleApi.Item[] = await response.json()

  // preprocess data
  const premiered = filterPremiering(data)
  return processData(premiered)
}

export async function scheduledTimeTable(): Promise<TimeTable[]> {
  // const today = format(new Date(), "yyyy-MM-dd")
  const url = `https://api.tvmaze.com/schedule?country=US`
  const response = await fetch(url)
  if (!response.ok) {
    return []
  }
  const data: TVScheduleApi.Item[] = await response.json()
  return processTimetableData(data)
}
