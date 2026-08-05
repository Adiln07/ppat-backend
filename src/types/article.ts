export type ArticleInput = {
  title: string;
  theme: string;
  eventDate: Date;
  imageUrl: string;
  description: string;
};

export type FilterArticle = {
  title?: string;
  page?: number;
  limit?: number;
};
