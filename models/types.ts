export type RawSchedule = RawEpisode[]
export type Schedule = Episode[]

interface BaseEpisode {
  season: number
  number: number
  id: number
  url: string
  name: string
  airstamp: string
  airdate: string
  airtime?: string
}

// for the API response
export interface RawEpisode extends BaseEpisode {
  _embedded: {
    show: Show
  }
}

// for the cleaned version
export interface Episode extends BaseEpisode {
  show: Show
}

export interface TimeTable {
  time: string
  shows: ShowWithChannel[]
}

export interface ShowWithChannel extends Show {
  channel: {
    name: string
    url: string
  }
  episode: {
    name: string
    url: string
  }
}

export interface Show {
  id: number
  url: string
  name: string
  schedule: {
    time?: string
    days?: string[]
  }
  image: Image
}

export interface Image {
  medium: string
  original: string
}
