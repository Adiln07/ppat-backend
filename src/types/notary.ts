export type Notary = {
  id: number;
  name: string;
  skPpat: string;
  address: string;
  mapUrl: string;
  kotaId: number;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
};

export type NotaryInput = {
  name: string;
  skPpat: string;
  address: string;
  mapUrl: string;
  kotaId: number;
  imageUrl: string;
};

export type NotaryUpdate = {
  name: string;
  skPpat: string;
  address: string;
  mapUrl: string;
  imageUrl: string;
};
