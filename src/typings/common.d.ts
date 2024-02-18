export type User = {
  fullname: string;
  email: string;
  username: string;
  phone: string;
  password: string;
};

export type Categories =
  | 'All'
  | 'Sports'
  | 'Crime'
  | 'Travel'
  | 'Style'
  | 'Automotive'
  | 'General'
  | 'Business';

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
