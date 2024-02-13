export type User = {
  Name: string;
  Email: string;
  Username: string;
  Phone: string;
  Password: string;
};

export type Categories = 'Sports' | 'Crime' | 'Travel' | 'Style' | 'Automotive';

export type ICategoryType = {
  name: Categories;
  icon: React.ReactNode;
  selectedIcon: React.ReactNode;
};

export interface INewsData {
  _id: string;
  title: string;
  description: string;
  url: string;
  author: string;
  image: string;
  language_id: string;
  category_id: string;
  published_at: string;
}

export interface IProfileBottomCard {
  title: string;
  icon: React.ReactNode;
}

export interface ICategoryListData {
  _id: string;
  category_name: string;
  __v: number;
}
