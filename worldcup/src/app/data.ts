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
    date: Date;
    home: Team;
    away: Team;
}

// TODO: Update teams after draw.
export const GROUPS = {
    'A': ['France', 'A2', 'A3', 'A4'],
    'B': ['B1', 'B2', 'B3', 'B4'],
    'C': ['C1', 'C2', 'C3', 'C4'],
    'D': ['D1', 'D2', 'D3', 'D4'],
    'E': ['E1', 'E2', 'E3', 'E4'],
    'F': ['F1', 'F2', 'F3', 'F4'],
};

export const TEAMS = [].concat(
    ...Object.keys(GROUPS).map((value: Group) => GROUPS[value])).sort();

export const CITIES =
    ['Paris', 'Reims', 'Rennes', 'Le Havre', 'Valenciennes', 'Grenoble', 'Nice', 'Montpellier', 'Lyon'].sort();
