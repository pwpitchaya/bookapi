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

export type BookResponse = {
  books: Book[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
};