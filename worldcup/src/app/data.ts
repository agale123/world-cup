export type City = 'paris' | 'reims' | 'rennes' | 'lehavre' | 'valenciennes' | 'grenoble' | 'nice' | 'montpellier';

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
    time: Date;
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
        city: 'paris',
        time: new Date(2019, 6, 7, 21, 0),
        home: group('A1'),
        away: group('A2')
    },
    {
        city: 'reims',
        time: new Date(2019, 6, 8, 15, 0),
        home: group('A3'),
        away: group('A4')
    },
    {
        city: 'rennes',
        time: new Date(2019, 6, 8, 21, 0),
        home: group('B1'),
        away: group('B2')
    },
    {
        city: 'lehavre',
        time: new Date(2019, 6, 8, 18, 0),
        home: group('B3'),
        away: group('B4')
    },
    {
        city: 'valenciennes',
        time: new Date(2019, 6, 9, 13, 0),
        home: group('C1'),
        away: group('C2')
    },
    {
        city: 'grenoble',
        time: new Date(2019, 6, 9, 15, 30),
        home: group('C3'),
        away: group('C4')
    },
    {
        city: 'nice',
        time: new Date(2019, 6, 9, 18, 0),
        home: group('D1'),
        away: group('D2')
    },
    {
        city: 'paris',
        time: new Date(2019, 6, 10, 18, 0),
        home: group('D3'),
        away: group('D4')
    },
    {
        city: 'montpellier',
        time: new Date(2019, 6, 10, 21, 0),
        home: group('E1'),
        away: group('E2')
    },
    {
        city: 'lehavre',
        time: new Date(2019, 6, 11, 15, 0),
        home: group('E3'),
        away: group('E4')
    },
    {
        city: 'reims',
        time: new Date(2019, 6, 11, 21, 0),
        home: group('F1'),
        away: group('F2')
    },
    {
        city: 'rennes',
        time: new Date(2019, 6, 11, 18, 0),
        home: group('F3'),
        away: group('F4')
    },
    {
        city: 'nice',
        time: new Date(2019, 6, 12, 21, 0),
        home: group('A1'),
        away: group('A3')
    },
    {
        city: 'grenoble',
        time: new Date(2019, 6, 12, 15, 0),
        home: group('A4'),
        away: group('A2')
    },
    {
        city: 'valenciennes',
        time: new Date(2019, 6, 12, 18, 0),
        home: group('B1'),
        away: group('B3')
    },
    {
        city: 'paris',
        time: new Date(2019, 6, 13, 21, 0),
        home: group('B4'),
        away: group('B2')
    },
    {
        city: 'montpellier',
        time: new Date(2019, 6, 13, 18, 0),
        home: group('C1'),
        away: group('C3')
    },
    {
        city: 'reims',
        time: new Date(2019, 6, 14, 21, 0),
        home: group('C2'),
        away: group('C4')
    },
    {
        city: 'lehavre',
        time: new Date(2019, 6, 14, 18, 0),
        home: group('D1'),
        away: group('D3')
    },
    {
        city: 'rennes',
        time: new Date(2019, 6, 14, 15, 0),
        home: group('D4'),
        away: group('D2')
    },
    {
        city: 'grenoble',
        time: new Date(2019, 6, 15, 21, 0),
        home: group('E1'),
        away: group('E3')
    },
    {
        city: 'valenciennes',
        time: new Date(2019, 6, 15, 18, 0),
        home: group('E4'),
        away: group('E2')
    },
    {
        city: 'paris',
        time: new Date(2019, 6, 16, 15, 0),
        home: group('F1'),
        away: group('F3')
    },
    {
        city: 'nice',
        time: new Date(2019, 6, 16, 18, 0),
        home: group('F4'),
        away: group('F2')
    },
    {
        city: 'rennes',
        time: new Date(2019, 6, 17, 21, 0),
        home: group('A4'),
        away: group('A1')
    },
    {
        city: 'reims',
        time: new Date(2019, 6, 17, 21, 0),
        home: group('A2'),
        away: group('A3')
    },
    {
        city: 'montpellier',
        time: new Date(2019, 6, 17, 18, 0),
        home: group('B4'),
        away: group('B1')
    },
    {
        city: 'lehavre',
        time: new Date(2019, 6, 17, 18, 0),
        home: group('B2'),
        away: group('B3')
    },
    {
        city: 'grenoble',
        time: new Date(2019, 6, 18, 21, 0),
        home: group('C4'),
        away: group('C1')
    },
    {
        city: 'valenciennes',
        time: new Date(2019, 6, 18, 21, 0),
        home: group('C2'),
        away: group('C3')
    },
    {
        city: 'nice',
        time: new Date(2019, 6, 19, 21, 0),
        home: group('D4'),
        away: group('D1')
    },
    {
        city: 'paris',
        time: new Date(2019, 6, 19, 21, 0),
        home: group('D2'),
        away: group('D3')
    },
    {
        city: 'reims',
        time: new Date(2019, 6, 20, 18, 0),
        home: group('E4'),
        away: group('E1')
    },
    {
        city: 'montpellier',
        time: new Date(2019, 6, 20, 18, 0),
        home: group('E2'),
        away: group('E3')
    },
    {
        city: 'lehavre',
        time: new Date(2019, 6, 20, 21, 0),
        home: group('F4'),
        away: group('F1')
    },
    {
        city: 'rennes',
        time: new Date(2019, 6, 20, 21, 0),
        home: group('F2'),
        away: group('F3')
    },
];
