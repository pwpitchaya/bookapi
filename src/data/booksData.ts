// src/data/booksData.ts
export type UserRef = {
  _id: string;
  username: string;
  email: string;
};

export type Book = {
  _id: string;
  title: string;
  author: string;
  description: string;
  genre: string;
  year: number;
  price: number;
  available: boolean;
  addedBy: UserRef;
  createdAt: string;
  updatedAt: string;
};

export const books: Book[] = [
  {
    _id: "68c135728082e18fcefa335a",
    title: "Brave New World",
    author: "Aldous Huxley",
    description:
      "A dystopian novel about a futuristic society where people are genetically bred and pharmaceutically anesthetized.",
    genre: "Dystopian",
    year: 1932,
    price: 12.99,
    available: true,
    addedBy: { _id: "68c135728082e18fcefa3350", username: "admin", email: "admin@cis.kku.ac.th" },
    createdAt: "2025-09-10T08:23:14.202Z",
    updatedAt: "2025-09-10T08:23:14.202Z",
  },
  {
    _id: "68c135728082e18fcefa3359",
    title: "The Alchemist",
    author: "Paulo Coelho",
    description:
      "A novel about a young Andalusian shepherd who dreams of finding a worldly treasure.",
    genre: "Adventure",
    year: 1988,
    price: 13.99,
    available: true,
    addedBy: { _id: "68c135728082e18fcefa3350", username: "admin", email: "admin@cis.kku.ac.th" },
    createdAt: "2025-09-10T08:23:14.199Z",
    updatedAt: "2025-09-10T08:23:14.199Z",
  },
  {
    _id: "68c135728082e18fcefa3358",
    title: "Animal Farm",
    author: "George Orwell",
    description:
      "An allegorical novella about a group of farm animals who rebel against their human farmer.",
    genre: "Allegory",
    year: 1945,
    price: 8.99,
    available: true,
    addedBy: { _id: "68c135728082e18fcefa3350", username: "admin", email: "admin@cis.kku.ac.th" },
    createdAt: "2025-09-10T08:23:14.196Z",
    updatedAt: "2025-09-10T08:23:14.196Z",
  },
  {
    _id: "68c135728082e18fcefa3357",
    title: "Lord of the Flies",
    author: "William Golding",
    description:
      "A novel about a group of British boys stranded on an uninhabited island and their disastrous attempt to govern themselves.",
    genre: "Allegory",
    year: 1954,
    price: 10.99,
    available: true,
    addedBy: { _id: "68c135728082e18fcefa3350", username: "admin", email: "admin@cis.kku.ac.th" },
    createdAt: "2025-09-10T08:23:14.193Z",
    updatedAt: "2025-09-10T08:23:14.193Z",
  },
  {
    _id: "68c135728082e18fcefa3356",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    description:
      "A novel about teenage alienation and loss of innocence in post-World War II America.",
    genre: "Coming-of-age",
    year: 1951,
    price: 11.99,
    available: true,
    addedBy: { _id: "68c135728082e18fcefa3350", username: "admin", email: "admin@cis.kku.ac.th" },
    createdAt: "2025-09-10T08:23:14.189Z",
    updatedAt: "2025-09-10T08:23:14.189Z",
  },
  {
    _id: "68c135728082e18fcefa3355",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    description:
      "A fantasy novel about Bilbo Baggins, a hobbit who embarks on a quest to reclaim the Lonely Mountain.",
    genre: "Fantasy",
    year: 1937,
    price: 14.99,
    available: true,
    addedBy: { _id: "68c135728082e18fcefa3350", username: "admin", email: "admin@cis.kku.ac.th" },
    createdAt: "2025-09-10T08:23:14.186Z",
    updatedAt: "2025-09-10T08:23:14.186Z",
  },
  {
    _id: "68c135728082e18fcefa3354",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    description:
      "A romantic novel of manners that follows the emotional development of Elizabeth Bennet.",
    genre: "Romance",
    year: 1813,
    price: 9.99,
    available: true,
    addedBy: { _id: "68c135728082e18fcefa3350", username: "admin", email: "admin@cis.kku.ac.th" },
    createdAt: "2025-09-10T08:23:14.182Z",
    updatedAt: "2025-09-10T08:23:14.182Z",
  },
  {
    _id: "68c135728082e18fcefa3353",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description:
      "A story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.",
    genre: "Classic",
    year: 1925,
    price: 10.99,
    available: true,
    addedBy: { _id: "68c135728082e18fcefa3350", username: "admin", email: "admin@cis.kku.ac.th" },
    createdAt: "2025-09-10T08:23:14.178Z",
    updatedAt: "2025-09-10T08:23:14.178Z",
  },
  {
    _id: "68c135728082e18fcefa3352",
    title: "1984",
    author: "George Orwell",
    description:
      "A dystopian novel about totalitarianism, surveillance, and the manipulation of truth in a futuristic society.",
    genre: "Dystopian",
    year: 1949,
    price: 11.99,
    available: true,
    addedBy: { _id: "68c135728082e18fcefa3350", username: "admin", email: "admin@cis.kku.ac.th" },
    createdAt: "2025-09-10T08:23:14.173Z",
    updatedAt: "2025-09-10T08:23:14.173Z",
  },
  {
    _id: "68c135728082e18fcefa3351",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description:
      "A novel about the serious issues of rape and racial inequality, told through the eyes of young Scout Finch in the Deep South.",
    genre: "Classic",
    year: 1960,
    price: 12.99,
    available: true,
    addedBy: { _id: "68c135728082e18fcefa3350", username: "admin", email: "admin@cis.kku.ac.th" },
    createdAt: "2025-09-10T08:23:14.168Z",
    updatedAt: "2025-09-10T08:23:14.168Z",
  },
];
