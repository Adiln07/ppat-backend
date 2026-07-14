export type City = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type FilterCity = {
  name?: string;
  page?: number;
  limit?: number;
};
