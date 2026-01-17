import { Subject } from "../types";

export const DEPARTMENTS = [
  "Computer Science",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
];

export const DEPARTMENTS_OPTIONS = DEPARTMENTS.map((dept) => {
  return {
    value: dept,
    label: dept,
  };
});

export const MOCK_SUBJECTS: Subject[] = [
  {
    id: 1,
    code: "CS101",
    name: "Introduction to Computer Science",
    department: "Computer Science",
    description: "Fundamental concepts of programming, algorithms, and computational thinking.",
    createdAt: "2024-09-01T00:00:00Z",
  },
  {
    id: 2,
    code: "CS201",
    name: "Data Structures and Algorithms",
    department: "Computer Science",
    description: "Study of arrays, lists, trees, graphs, sorting, searching, and algorithm analysis.",
    createdAt: "2024-09-01T00:00:00Z",
  },
  {
    id: 3,
    code: "MATH101",
    name: "Calculus I",
    department: "Mathematics",
    description: "Limits, derivatives, integrals, and applications to real-world problems.",
    createdAt: "2024-09-01T00:00:00Z",
  },
  {
    id: 4,
    code: "PHYS101",
    name: "Physics I",
    department: "Physics",
    description: "Mechanics, energy, and motion with an emphasis on problem solving.",
    createdAt: "2024-09-01T00:00:00Z",
  },
  {
    id: 5,
    code: "CHEM101",
    name: "General Chemistry",
    department: "Chemistry",
    description: "Atomic structure, stoichiometry, thermochemistry, and chemical reactions.",
    createdAt: "2024-09-01T00:00:00Z",
  },
  {
    id: 6,
    code: "BIO101",
    name: "Introduction to Biology",
    department: "Biology",
    description: "Cell structure, genetics, evolution, and ecology fundamentals.",
    createdAt: "2024-09-01T00:00:00Z",
  },
  {
    id: 7,
    code: "ENG101",
    name: "English Composition",
    department: "English",
    description: "Writing, critical reading, and rhetoric for academic contexts.",
    createdAt: "2024-09-01T00:00:00Z",
  },
  {
    id: 8,
    code: "HIST201",
    name: "World History",
    department: "History",
    description: "Key events, movements, and themes that shaped the modern world.",
    createdAt: "2024-09-01T00:00:00Z",
  },
  {
    id: 9,
    code: "ECON101",
    name: "Principles of Economics",
    department: "Economics",
    description: "Microeconomics and macroeconomics fundamentals and real-world applications.",
    createdAt: "2024-09-01T00:00:00Z",
  },
  {
    id: 10,
    code: "PSY101",
    name: "Introduction to Psychology",
    department: "Psychology",
    description: "Overview of psychological science, behavior, cognition, and research methods.",
    createdAt: "2024-09-01T00:00:00Z",
  },
  {
    id: 11,
    code: "ENGR210",
    name: "Engineering Mechanics",
    department: "Engineering",
    description: "Statics, dynamics, and the analysis of forces in engineering systems.",
    createdAt: "2024-09-01T00:00:00Z",
  },
  {
    id: 12,
    code: "STAT200",
    name: "Probability and Statistics",
    department: "Mathematics",
    description: "Probability theory, distributions, estimation, and hypothesis testing.",
    createdAt: "2024-09-01T00:00:00Z",
  },
];
