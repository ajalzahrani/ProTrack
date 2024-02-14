const routines = [
  {
    id: 1,
    title: 'Big bie',
    startDate: '2023-01-01',
    endDate: '2023-01-18',
    level: 0,
    description:
      'This routine fouces on bieceps training and concentrating on.',
    workouts: [
      {
        id: '1',
        title: 'pushup workout',
        exercises: [
          {id: '1', freq: [15, 12, 12, 10]},
          {id: '2', freq: [10, 10, 10]},
          {id: '3', freq: [10, 10, 10, 10, 10]},
          {id: '4', freq: [20, 20]},
        ],
        resttime: [5, 10],
      },
      {
        id: '2',
        title: 'pullup workout',
        exercises: [
          {id: '1', freq: [15, 12, 12, 10]},
          {id: '2', freq: [10, 10, 10]},
          {id: '3', freq: [10, 10, 10, 10, 10]},
          {id: '4', freq: [20, 20]},
        ],
        resttime: [7, 7],
      },
      {
        id: '3',
        title: 'Legs workout',
        exercises: [
          {freq: [15, 10, 10], id: '7'},
          {freq: [15, 10, 10], id: '9'},
          {freq: [15, 10, 10], id: '14'},
        ],
        resttime: [0, 0],
      },
    ],
    weekdays: [
      {id: 0, symbol: 'S', isWorkday: true, workoutId: '1'},
      {id: 1, symbol: 'M', isWorkday: true, workoutId: '2'},
      {id: 2, symbol: 'T', isWorkday: false, workoutId: '-1'},
      {id: 3, symbol: 'W', isWorkday: true, workoutId: '3'},
      {id: 4, symbol: 'T', isWorkday: true, workoutId: '3'},
      {id: 5, symbol: 'F', isWorkday: false, workoutId: '-1'},
      {id: 6, symbol: 'S', isWorkday: false, workoutId: '-1'},
    ],
  },
  {
    id: '2',
    title: 'Olembya',
    startDate: '2023-01-18',
    endDate: '2023-01-20',
    level: 2,
    description: 'This routine is for heros',
    workouts: [
      {
        id: '1',
        title: 'Game is on',
        exercises: [
          {id: '1', freq: [15, 12, 12, 10]},
          {id: '2', freq: [10, 10, 10]},
          {id: '3', freq: [10, 10, 10, 10, 10]},
          {id: '4', freq: [20, 20]},
        ],
        resttime: [5, 10],
      },
      {
        id: '2',
        title: 'Take a challage',
        exercises: [
          {id: '1', freq: [15, 12, 12, 10]},
          {id: '2', freq: [10, 10, 10]},
          {id: '3', freq: [10, 10, 10, 10, 10]},
          {id: '4', freq: [20, 20]},
        ],
        resttime: [7, 7],
      },
      {id: '3', title: 'Rekoo', exercises: [], resttime: [0, 0]},
    ],
    weekdays: [
      {id: 0, symbol: 'S', isWorkday: false, workoutId: '-1'},
      {id: 1, symbol: 'M', isWorkday: false, workoutId: '-1'},
      {id: 2, symbol: 'T', isWorkday: true, workoutId: '2'},
      {id: 3, symbol: 'W', isWorkday: false, workoutId: '-1'},
      {id: 4, symbol: 'T', isWorkday: false, workoutId: '-1'},
      {id: 5, symbol: 'F', isWorkday: true, workoutId: '3'},
      {id: 6, symbol: 'S', isWorkday: true, workoutId: '2'},
    ],
  },
  {
    id: '3',
    title: 'Routine B',
    startDate: '2023-01-09',
    endDate: '2023-01-18',
    level: 1,
    description: 'Some desc',
    workouts: [
      {
        id: '9f135c6a-31c0-4f7b-9081-1cb5b8e7c2c9',
        title: '3',
        exercises: [{id: '1', freq: []}],
        resttime: [0, 0],
      },
    ],
    weekdays: [
      {id: 0, symbol: 'S', isWorkday: false, workoutId: '-1'},
      {id: 1, symbol: 'M', isWorkday: false, workoutId: '-1'},
      {
        id: 2,
        symbol: 'T',
        isWorkday: true,
        workout: '9f135c6a-31c0-4f7b-9081-1cb5b8e7c2c9',
      },
      {id: 3, symbol: 'W', isWorkday: false, workoutId: '-1'},
      {id: 4, symbol: 'T', isWorkday: false, workoutId: '-1'},
      {id: 5, symbol: 'F', isWorkday: false, workoutId: '-1'},
      {id: 6, symbol: 'S', isWorkday: false, workoutId: '-1'},
    ],
  },
  {
    id: '4',
    title: '144',
    startDate: '2023-01-08',
    endDate: '2023-01-12',
    level: 0,
    description: '5',
    workouts: [],
    weekdays: [
      {id: 0, symbol: 'S', isWorkday: false, workoutId: '-1'},
      {id: 1, symbol: 'M', isWorkday: false, workoutId: '-1'},
      {id: 2, symbol: 'T', isWorkday: false, workoutId: '-1'},
      {id: 3, symbol: 'W', isWorkday: false, workoutId: '-1'},
      {id: 4, symbol: 'T', isWorkday: false, workoutId: '-1'},
      {id: 5, symbol: 'F', isWorkday: false, workoutId: '-1'},
      {id: 6, symbol: 'S', isWorkday: false, workoutId: '-1'},
    ],
  },
];

export default routines;
