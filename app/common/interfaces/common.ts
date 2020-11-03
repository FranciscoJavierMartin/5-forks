export interface ILocation {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export interface IRestaurant {
  name: string;
  address: string;
  description: string;
  location: ILocation;
  images: string[];
  rating: number;
  ratingTotal: number;
  votes: number;
  createAt: Date;
  createdBy: string;
  id: string;
}

export interface IRestaurantToCreate {
  name: string;
  address: string;
  description: string;
  location: ILocation;
  images: string[];
}

export interface IReview {
  id?: string;
  authorId: string;
  avatarUrl: string | null;
  restaurantId: string;
  title: string;
  comment: string;
  rating: number;
  createdAt: Date;
}
