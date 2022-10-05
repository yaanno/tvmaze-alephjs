declare namespace Schedule {
  export interface Rating {
    average?: string
  }

  export interface Image {
    medium: string
    original: string
  }

  export interface Schedule {
    time: string
    days: string[]
  }

  export interface Country {
    name: string
    code: string
    timezone: string
  }

  export interface Network {
    id: number
    name: string
    country: Country
    officialSite: string
  }

  export interface WebChannel {
    id: number
    name: string
    country: Country
    officialSite: string
  }

  export interface Externals {
    tvrage?: number
    thetvdb?: number
    imdb: string
  }

  export interface Self {
    href: string
  }

  export interface Previousepisode {
    href: string
  }

  export interface Nextepisode {
    href: string
  }

  export interface Links {
    self: Self
  }

  export interface LinkedLinks extends Links {
    previousepisode: Previousepisode
    nextepisode: Nextepisode
  }

  export interface Show {
    id: number
    url: string
    name: string
    type: string
    language: string
    genres: string[]
    status: string
    runtime?: number
    averageRuntime?: number
    premiered: string
    ended?: boolean | null
    officialSite: string
    schedule: Schedule
    rating: Rating
    weight: number
    network: Network
    webChannel: WebChannel
    dvdCountry?: unknown
    externals: Externals
    image: Image
    summary: string
    updated: number
    _links: LinkedLinks
  }

  export interface Item {
    id: number
    url: string
    name: string
    season: number
    number: number
    type: string
    airdate: string
    airtime: string
    airstamp: string
    runtime?: number
    rating: Rating
    image: Image
    summary: string
    show: Show
    _links: Links
  }
}

export default Schedule
