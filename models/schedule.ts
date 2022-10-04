import type { RawSchedule, Schedule } from "./types.ts"

export async function scheduledTomorrow(): Promise<Schedule> {
  const url = "https://api.tvmaze.com/schedule/web?date=2022-10-05"
  const response = await fetch(url)
  if (!response.ok) {
    return []
  }
  return await response.json()
}

export async function scheduledToday(): Promise<Schedule> {
  const url = "https://api.tvmaze.com/schedule/web?date=2022-10-04"
  const response = await fetch(url)
  if (!response.ok) {
    return []
  }
  const data: RawSchedule = await response.json()

  // preprocess data
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
