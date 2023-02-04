export type League = {
  id: string
  name: string // Serie A
}

export type Season = {
  id: string
  key: string // seriea.17/18
  name: string // Serie A 2017/2018
  league: League // data.serieA_league
}

export type Competition = {
  id: string
  key: string // seriea.2017
  name: string // Serie A 17/18
  league: League // data.serieA_league
  season: Season // data.season
  start: number // timestamp
  end: number // timestamp
  teams: Team[] // data.serieA_teams
  phases: Phase[]
  // groups?: Group[]
  // rounds: Round[]
}

export type Phase = {
  id: string
  num: number
  name: string
  type: 'knockout' | 'two-legs' | 'tournament'
  // competition: Competition
  // teams?: Team[]
  groups?: Group[]
  rounds?: Round[]
}

export type Group = {
  id: string
  num: number
  name: string
  // competition: Competition
  teams: Team[]
  // phase: Phase
  matches: Match[]
}

export type Round = {
  id: string
  num: number // 1
  name: string // Round 1; 1ª Giornata
  // competition: Competition
  matches: Match[]
  matchdays?: MatchDay[] // draft
}

// draft
export type MatchDay = {
  start: number // timestamp
  matches: Match[]
}

export type Match = {
  id: string
  start: number
  teamHome: Team
  teamAway: Team
  goalsHome?: number
  goalsAway?: number
  played?: boolean
}

export type Team = {
  id: string
  key: string // napoli
  name: string // Napoli
  code: string // NAP
}

// TODO: Refine this idea
export type Event = {
  type: 'goal' | 'yellow-card' | 'red-card' | 'foul' | 'date-change'
}

/////////////////////////////////

// export type Schedule = Extract<Action, { type: 'add' }>

// Schedule without phases
// export type Schedule = ScheduleRound[]
export type ScheduleRound = ScheduleMatch[]
export type ScheduleMatch = [Team, Team]

// Schedule with phases
// export type Schedule = SchedulePhase[]
// export type SchedulePhase = ScheduleRound[]
// export type ScheduleRound = ScheduleMatch[]
// export type ScheduleMatch = [Team, Team]

export type Standings = {
  id: string
  name: string
  points: number
  goals: number
  goalsConceded: number
  goalsDifference: number
}

/////////////////////////////////

type RemoveIndex<T> = {
  [K in keyof T as string extends K
    ? never
    : number extends K
    ? never
    : K]: T[K]
}
