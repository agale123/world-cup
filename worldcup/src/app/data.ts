export type City = 'Paris' | 'Reims' | 'Rennes' | 'Le Havre' | 'Valenciennes' | 'Grenoble' | 'Nice' | 'Montpellier' | 'Lyon';

export type Group = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

// In the group stage, teams are represented by their group and an index within
// the group.
export interface GroupTeam {
    group: Group;
    index: number;
}

// In the first round of elimination play, a team is determined by a list of
// groups and a seed within that group. A list is needed because only 4 3rd
// seeds advance.
export interface InitialEliminationTeam {
    group: Group[];
    seed: number;
}

// In subsequent rounds of elimination play, a team is determined by the id
// of the game won to advance to this game.
export interface EliminationTeam {
    winner: number;
    teams?: string[];
}

// The 3rd place game is a special case.
export interface ConsolationTeam {
    loser: number;
}

export type Team = GroupTeam | InitialEliminationTeam | EliminationTeam | ConsolationTeam;

export interface Game {
    id: number;
    city: City;
    date: string;
    home: Team;
    away: Team;
}

export const GROUPS = {
    'A': ['France', 'South Korea', 'Norway', 'Nigeria'],
    'B': ['Germany', 'China', 'Spain', 'South Africa'],
    'C': ['Australia', 'Italy', 'Brazil', 'Jamaica'],
    'D': ['England', 'Scotland', 'Argentina', 'Japan'],
    'E': ['Canada', 'Cameroon', 'New Zealand', 'Netherlands'],
    'F': ['United States', 'Thailand', 'Chile', 'Sweden'],
};

export const TEAMS = [].concat(
    ...Object.keys(GROUPS).map((value: Group) => GROUPS[value])).sort();

export const CITIES =
    ['Paris', 'Reims', 'Rennes', 'Le Havre', 'Valenciennes', 'Grenoble', 'Nice', 'Montpellier', 'Lyon'].sort();
