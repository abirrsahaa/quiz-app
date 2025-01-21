import { ExamType } from '@/types/quiz';

export const exams: ExamType[] = [
  {
    id: '1',
    name: 'GATE CSE',
    description: 'Graduate Aptitude Test in Engineering for Computer Science',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
    duration: 180,
    questionCount: 65,
    subjects: [
      {
        id: '1',
        name: 'Data Structures',
        topics: [
          { id: '1', name: 'Arrays' },
          { id: '2', name: 'Linked Lists' },
          { id: '3', name: 'Trees' },
        ],
      },
      {
        id: '2',
        name: 'Algorithms',
        topics: [
          { id: '4', name: 'Sorting' },
          { id: '5', name: 'Searching' },
          { id: '6', name: 'Dynamic Programming' },
        ],
      },
    ],
  },
  {
    id: '2',
    name: 'JEE Main',
    description: 'Joint Entrance Examination for Engineering',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb',
    duration: 180,
    questionCount: 90,
    subjects: [
      {
        id: '3',
        name: 'Physics',
        topics: [
          { id: '7', name: 'Mechanics' },
          { id: '8', name: 'Thermodynamics' },
          { id: '9', name: 'Optics' },
        ],
      },
      {
        id: '4',
        name: 'Chemistry',
        topics: [
          { id: '10', name: 'Organic Chemistry' },
          { id: '11', name: 'Inorganic Chemistry' },
          { id: '12', name: 'Physical Chemistry' },
        ],
      },
    ],
  },
];