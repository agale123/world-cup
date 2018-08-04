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

function group(value: string) {
    const split = value.split('');
    return {
        group: split[0],
        index: parseInt(split[1], 10),
    } as GroupTeam;
}

function first(value: string) {
    const split = value.split('');
    return {
        group: split.splice(1),
        seed: parseInt(split[0], 10),
    } as InitialEliminationTeam;
}

function elim(value: number) {
    return {
        winner: value,
    } as EliminationTeam;
}

function cons(value: number) {
    return {
        loser: value,
    } as ConsolationTeam;
}

export const GAMES: Game[] = [
    {
        id: 1,
        city: 'Paris',
        date: new Date(2019, 6, 7, 21, 0),
        home: group('A1'),
        away: group('A2')
    },
    {
        id: 2,
        city: 'Reims',
        date: new Date(2019, 6, 8, 15, 0),
        home: group('A3'),
        away: group('A4')
    },
    {
        id: 3,
        city: 'Rennes',
        date: new Date(2019, 6, 8, 21, 0),
        home: group('B1'),
        away: group('B2')
    },
    {
        id: 4,
        city: 'Le Havre',
        date: new Date(2019, 6, 8, 18, 0),
        home: group('B3'),
        away: group('B4')
    },
    {
        id: 5,
        city: 'Valenciennes',
        date: new Date(2019, 6, 9, 13, 0),
        home: group('C1'),
        away: group('C2')
    },
    {
        id: 6,
        city: 'Grenoble',
        date: new Date(2019, 6, 9, 15, 30),
        home: group('C3'),
        away: group('C4')
    },
    {
        id: 7,
        city: 'Nice',
        date: new Date(2019, 6, 9, 18, 0),
        home: group('D1'),
        away: group('D2')
    },
    {
        id: 8,
        city: 'Paris',
        date: new Date(2019, 6, 10, 18, 0),
        home: group('D3'),
        away: group('D4')
    },
    {
        id: 9,
        city: 'Montpellier',
        date: new Date(2019, 6, 10, 21, 0),
        home: group('E1'),
        away: group('E2')
    },
    {
        id: 10,
        city: 'Le Havre',
        date: new Date(2019, 6, 11, 15, 0),
        home: group('E3'),
        away: group('E4')
    },
    {
        id: 11,
        city: 'Reims',
        date: new Date(2019, 6, 11, 21, 0),
        home: group('F1'),
        away: group('F2')
    },
    {
        id: 12,
        city: 'Rennes',
        date: new Date(2019, 6, 11, 18, 0),
        home: group('F3'),
        away: group('F4')
    },
    {
        id: 13,
        city: 'Nice',
        date: new Date(2019, 6, 12, 21, 0),
        home: group('A1'),
        away: group('A3')
    },
    {
        id: 14,
        city: 'Grenoble',
        date: new Date(2019, 6, 12, 15, 0),
        home: group('A4'),
        away: group('A2')
    },
    {
        id: 15,
        city: 'Valenciennes',
        date: new Date(2019, 6, 12, 18, 0),
        home: group('B1'),
        away: group('B3')
    },
    {
        id: 16,
        city: 'Paris',
        date: new Date(2019, 6, 13, 21, 0),
        home: group('B4'),
        away: group('B2')
    },
    {
        id: 17,
        city: 'Montpellier',
        date: new Date(2019, 6, 13, 18, 0),
        home: group('C1'),
        away: group('C3')
    },
    {
        id: 18,
        city: 'Reims',
        date: new Date(2019, 6, 14, 21, 0),
        home: group('C2'),
        away: group('C4')
    },
    {
        id: 19,
        city: 'Le Havre',
        date: new Date(2019, 6, 14, 18, 0),
        home: group('D1'),
        away: group('D3')
    },
    {
        id: 20,
        city: 'Rennes',
        date: new Date(2019, 6, 14, 15, 0),
        home: group('D4'),
        away: group('D2')
    },
    {
        id: 21,
        city: 'Grenoble',
        date: new Date(2019, 6, 15, 21, 0),
        home: group('E1'),
        away: group('E3')
    },
    {
        id: 22,
        city: 'Valenciennes',
        date: new Date(2019, 6, 15, 18, 0),
        home: group('E4'),
        away: group('E2')
    },
    {
        id: 23,
        city: 'Paris',
        date: new Date(2019, 6, 16, 15, 0),
        home: group('F1'),
        away: group('F3')
    },
    {
        id: 24,
        city: 'Nice',
        date: new Date(2019, 6, 16, 18, 0),
        home: group('F4'),
        away: group('F2')
    },
    {
        id: 25,
        city: 'Rennes',
        date: new Date(2019, 6, 17, 21, 0),
        home: group('A4'),
        away: group('A1')
    },
    {
        id: 26,
        city: 'Reims',
        date: new Date(2019, 6, 17, 21, 0),
        home: group('A2'),
        away: group('A3')
    },
    {
        id: 27,
        city: 'Montpellier',
        date: new Date(2019, 6, 17, 18, 0),
        home: group('B4'),
        away: group('B1')
    },
    {
        id: 28,
        city: 'Le Havre',
        date: new Date(2019, 6, 17, 18, 0),
        home: group('B2'),
        away: group('B3')
    },
    {
        id: 29,
        city: 'Grenoble',
        date: new Date(2019, 6, 18, 21, 0),
        home: group('C4'),
        away: group('C1')
    },
    {
        id: 30,
        city: 'Valenciennes',
        date: new Date(2019, 6, 18, 21, 0),
        home: group('C2'),
        away: group('C3')
    },
    {
        id: 31,
        city: 'Nice',
        date: new Date(2019, 6, 19, 21, 0),
        home: group('D4'),
        away: group('D1')
    },
    {
        id: 32,
        city: 'Paris',
        date: new Date(2019, 6, 19, 21, 0),
        home: group('D2'),
        away: group('D3')
    },
    {
        id: 33,
        city: 'Reims',
        date: new Date(2019, 6, 20, 18, 0),
        home: group('E4'),
        away: group('E1')
    },
    {
        id: 34,
        city: 'Montpellier',
        date: new Date(2019, 6, 20, 18, 0),
        home: group('E2'),
        away: group('E3')
    },
    {
        id: 35,
        city: 'Le Havre',
        date: new Date(2019, 6, 20, 21, 0),
        home: group('F4'),
        away: group('F1')
    },
    {
        id: 36,
        city: 'Rennes',
        date: new Date(2019, 6, 20, 21, 0),
        home: group('F2'),
        away: group('F3')
    },
    {
        id: 37,
        city: 'Nice',
        date: new Date(2019, 6, 22, 18, 30),
        home: first('2A'),
        away: first('2C')
    },
    {
        id: 38,
        city: 'Grenoble',
        date: new Date(2019, 6, 22, 15, 0),
        home: first('1B'),
        away: first('3ACD')
    },
    {
        id: 39,
        city: 'Valenciennes',
        date: new Date(2019, 6, 23, 17, 30),
        home: first('1D'),
        away: first('3BEF')
    },
    {
        id: 40,
        city: 'Le Havre',
        date: new Date(2019, 6, 23, 21, 0),
        home: first('1A'),
        away: first('3CDE')
    },
    {
        id: 41,
        city: 'Reims',
        date: new Date(2019, 6, 24, 18, 0),
        home: first('2B'),
        away: first('2F')
    },
    {
        id: 42,
        city: 'Paris',
        date: new Date(2019, 6, 24, 21, 0),
        home: first('1F'),
        away: first('2E')
    },
    {
        id: 43,
        city: 'Montpellier',
        date: new Date(2019, 6, 25, 18, 0),
        home: first('1C'),
        away: first('3ABF')
    },
    {
        id: 44,
        city: 'Rennes',
        date: new Date(2019, 6, 25, 21, 0),
        home: first('1E'),
        away: first('2D')
    },
    {
        id: 45,
        city: 'Le Havre',
        date: new Date(2019, 6, 27, 21, 0),
        home: elim(37),
        away: elim(39)
    },
    {
        id: 46,
        city: 'Paris',
        date: new Date(2019, 6, 28, 21, 0),
        home: elim(40),
        away: elim(41)
    },
    {
        id: 47,
        city: 'Valenciennes',
        date: new Date(2019, 6, 29, 15, 0),
        home: elim(43),
        away: elim(44)
    },
    {
        id: 48,
        city: 'Rennes',
        date: new Date(2019, 6, 29, 18, 30),
        home: elim(38),
        away: elim(42)
    },
    {
        id: 49,
        city: 'Lyon',
        date: new Date(2019, 7, 2, 21, 0),
        home: elim(45),
        away: elim(46)
    },
    {
        id: 50,
        city: 'Lyon',
        date: new Date(2019, 7, 3, 21, 0),
        home: elim(47),
        away: elim(48)
    },
    {
        id: 51,
        city: 'Nice',
        date: new Date(2019, 7, 6, 17, 0),
        home: cons(49),
        away: cons(50)
    },
    {
        id: 52,
        city: 'Lyon',
        date: new Date(2019, 7, 7, 17, 0),
        home: elim(49),
        away: elim(50)
    },
] as Game[];

export const GROUPS = {
    'A': ['Canada', 'China', 'Netherlands', 'New Zealand'],
    'B': ['Germany', 'Norway', 'Thailand', 'Ivory Coast'],
    'C': ['Japan', 'Cameroon', 'Switzerland', 'Ecuador'],
    'D': ['United States', 'Australia', 'Sweden', 'Nigeria'],
    'E': ['Brazil', 'South Korea', 'Costa Rica', 'Spain'],
    'F': ['France', 'England', 'Columbia', 'Mexico'],
};

export const TEAMS = [].concat(
    ...Object.keys(GROUPS).map((value: Group) => GROUPS[value])).sort();

export const CITIES =
    Array.from(new Set(GAMES.map(game => game.city)).values()).sort();

/** Distances between pairs of cities (by road) in miles */
export const DISTANCES = new Map([
    [['Lyon', 'Paris'].sort().join(), 290],
    [['Lyon', 'Reims'].sort().join(), 304],
    [['Lyon', 'Rennes'].sort().join(), 462],
    [['Lyon', 'Le Havre'].sort().join(), 408],
    [['Lyon', 'Valenciennes'].sort().join(), 411],
    [['Lyon', 'Grenoble'].sort().join(), 70],
    [['Lyon', 'Nice'].sort().join(), 293],
    [['Lyon', 'Montpellier'].sort().join(), 189],
    [['Paris', 'Reims'].sort().join(), 90],
    [['Paris', 'Rennes'].sort().join(), 220],
    [['Paris', 'Le Havre'].sort().join(), 122],
    [['Paris', 'Valenciennes'].sort().join(), 131],
    [['Paris', 'Grenoble'].sort().join(), 357],
    [['Paris', 'Nice'].sort().join(), 579],
    [['Paris', 'Montpellier'].sort().join(), 465],
    [['Reims', 'Rennes'].sort().join(), 303],
    [['Reims', 'Le Havre'].sort().join(), 218],
    [['Reims', 'Valenciennes'].sort().join(), 109],
    [['Reims', 'Grenoble'].sort().join(), 372],
    [['Reims', 'Nice'].sort().join(), 594],
    [['Reims', 'Montpellier'].sort().join(), 490],
    [['Rennes', 'Le Havre'].sort().join(), 173],
    [['Rennes', 'Valenciennes'].sort().join(), 342],
    [['Rennes', 'Grenoble'].sort().join(), 526],
    [['Rennes', 'Nice'].sort().join(), 748],
    [['Rennes', 'Montpellier'].sort().join(), 564],
    [['Le Havre', 'Valenciennes'].sort().join(), 189],
    [['Le Havre', 'Grenoble'].sort().join(), 476],
    [['Le Havre', 'Nice'].sort().join(), 697],
    [['Le Havre', 'Montpellier'].sort().join(), 577],
    [['Valenciennes', 'Grenoble'].sort().join(), 479],
    [['Valenciennes', 'Nice'].sort().join(), 701],
    [['Valenciennes', 'Montpellier'].sort().join(), 597],
    [['Grenoble', 'Nice'].sort().join(), 238],
    [['Grenoble', 'Montpellier'].sort().join(), 184],
    [['Nice', 'Montpellier'].sort().join(), 204],
]);
