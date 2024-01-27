export type Categories = 'Sports' | 'Crime' | 'Travel' | 'Style' | 'Automotive';

export type ICategoryType = {
  name: Categories;
  icon: React.ReactNode;
  selectedIcon: React.ReactNode;
};

export interface INewsData {
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
