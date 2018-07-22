export type City = 'Paris' | 'Reims' | 'Rennes' | 'Le Havre' | 'Valenciennes' | 'Grenoble' | 'Nice' | 'Montpellier';

export type Group = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

export interface GroupTeam {
    group: Group;
    index: number;
}

export interface EliminationTeam {
    group: Group;
    seed: number;
}

export type Team = GroupTeam | EliminationTeam;

export interface Game {
    city: City;
    date: Date;
    home: Team;
    away: Team;
}

function group(value: string) {
    const split = value.split('');
    return {
        group: split[0],
        index: parseInt(split[1], 10),
    } as GroupTeam;
}

export const GAMES: Game[] = [
    {
        city: 'Paris',
        date: new Date(2019, 6, 7, 21, 0),
        home: group('A1'),
        away: group('A2')
    },
    {
        city: 'Reims',
        date: new Date(2019, 6, 8, 15, 0),
        home: group('A3'),
        away: group('A4')
    },
    {
        city: 'Rennes',
        date: new Date(2019, 6, 8, 21, 0),
        home: group('B1'),
        away: group('B2')
    },
    {
        city: 'Le Havre',
        date: new Date(2019, 6, 8, 18, 0),
        home: group('B3'),
        away: group('B4')
    },
    {
        city: 'Valenciennes',
        date: new Date(2019, 6, 9, 13, 0),
        home: group('C1'),
        away: group('C2')
    },
    {
        city: 'Grenoble',
        date: new Date(2019, 6, 9, 15, 30),
        home: group('C3'),
        away: group('C4')
    },
    {
        city: 'Nice',
        date: new Date(2019, 6, 9, 18, 0),
        home: group('D1'),
        away: group('D2')
    },
    {
        city: 'Paris',
        date: new Date(2019, 6, 10, 18, 0),
        home: group('D3'),
        away: group('D4')
    },
    {
        city: 'Montpellier',
        date: new Date(2019, 6, 10, 21, 0),
        home: group('E1'),
        away: group('E2')
    },
    {
        city: 'Le Havre',
        date: new Date(2019, 6, 11, 15, 0),
        home: group('E3'),
        away: group('E4')
    },
    {
        city: 'Reims',
        date: new Date(2019, 6, 11, 21, 0),
        home: group('F1'),
        away: group('F2')
    },
    {
        city: 'Rennes',
        date: new Date(2019, 6, 11, 18, 0),
        home: group('F3'),
        away: group('F4')
    },
    {
        city: 'Nice',
        date: new Date(2019, 6, 12, 21, 0),
        home: group('A1'),
        away: group('A3')
    },
    {
        city: 'Grenoble',
        date: new Date(2019, 6, 12, 15, 0),
        home: group('A4'),
        away: group('A2')
    },
    {
        city: 'Valenciennes',
        date: new Date(2019, 6, 12, 18, 0),
        home: group('B1'),
        away: group('B3')
    },
    {
        city: 'Paris',
        date: new Date(2019, 6, 13, 21, 0),
        home: group('B4'),
        away: group('B2')
    },
    {
        city: 'Montpellier',
        date: new Date(2019, 6, 13, 18, 0),
        home: group('C1'),
        away: group('C3')
    },
    {
        city: 'Reims',
        date: new Date(2019, 6, 14, 21, 0),
        home: group('C2'),
        away: group('C4')
    },
    {
        city: 'Le Havre',
        date: new Date(2019, 6, 14, 18, 0),
        home: group('D1'),
        away: group('D3')
    },
    {
        city: 'Rennes',
        date: new Date(2019, 6, 14, 15, 0),
        home: group('D4'),
        away: group('D2')
    },
    {
        city: 'Grenoble',
        date: new Date(2019, 6, 15, 21, 0),
        home: group('E1'),
        away: group('E3')
    },
    {
        city: 'Valenciennes',
        date: new Date(2019, 6, 15, 18, 0),
        home: group('E4'),
        away: group('E2')
    },
    {
        city: 'Paris',
        date: new Date(2019, 6, 16, 15, 0),
        home: group('F1'),
        away: group('F3')
    },
    {
        city: 'Nice',
        date: new Date(2019, 6, 16, 18, 0),
        home: group('F4'),
        away: group('F2')
    },
    {
        city: 'Rennes',
        date: new Date(2019, 6, 17, 21, 0),
        home: group('A4'),
        away: group('A1')
    },
    {
        city: 'Reims',
        date: new Date(2019, 6, 17, 21, 0),
        home: group('A2'),
        away: group('A3')
    },
    {
        city: 'Montpellier',
        date: new Date(2019, 6, 17, 18, 0),
        home: group('B4'),
        away: group('B1')
    },
    {
        city: 'Le Havre',
        date: new Date(2019, 6, 17, 18, 0),
        home: group('B2'),
        away: group('B3')
    },
    {
        city: 'Grenoble',
        date: new Date(2019, 6, 18, 21, 0),
        home: group('C4'),
        away: group('C1')
    },
    {
        city: 'Valenciennes',
        date: new Date(2019, 6, 18, 21, 0),
        home: group('C2'),
        away: group('C3')
    },
    {
        city: 'Nice',
        date: new Date(2019, 6, 19, 21, 0),
        home: group('D4'),
        away: group('D1')
    },
    {
        city: 'Paris',
        date: new Date(2019, 6, 19, 21, 0),
        home: group('D2'),
        away: group('D3')
    },
    {
        city: 'Reims',
        date: new Date(2019, 6, 20, 18, 0),
        home: group('E4'),
        away: group('E1')
    },
    {
        city: 'Montpellier',
        date: new Date(2019, 6, 20, 18, 0),
        home: group('E2'),
        away: group('E3')
    },
    {
        city: 'Le Havre',
        date: new Date(2019, 6, 20, 21, 0),
        home: group('F4'),
        away: group('F1')
    },
    {
        city: 'Rennes',
        date: new Date(2019, 6, 20, 21, 0),
        home: group('F2'),
        away: group('F3')
    },
];

export const GROUPS = {
    'A': ['Canada', 'China', 'Netherlands', 'New Zealand'],
    'B': ['Germany', 'Norway', 'Thailand', 'Ivory Coast'],
    'C': ['Japan', 'Cameroon', 'Switzerland', 'Ecuador'],
    'D': ['United States', 'Australia', 'Sweden', 'Nigeria'],
    'E': ['Brazil', 'South Korea', 'Costa Rica', 'Spain'],
    'F': ['France', 'England', 'Columbia', 'Mexico'],
};

export const TEAMS = [].concat(
    ...Object.keys(GROUPS).map((value: Group) => GROUPS[value]));

export const CITIES = Array.from(new Set(GAMES.map(game => game.city)).values());
