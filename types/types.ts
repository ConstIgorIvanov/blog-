export interface Post {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredimage: Photo;
  featuredpost: boolean;
  author: Author;
  categories: Category[];
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  posts: Post[];
}
export interface Comment {
  name: string;
  email: string;
  comment: string;
}
export interface Author {
  name: string;
  photo: Photo;
  bio: string;
  posts: Post[];
}

export type Photo = {
  url: string;
};
