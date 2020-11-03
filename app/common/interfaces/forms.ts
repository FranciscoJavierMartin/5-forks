export interface IFormRegisterValues {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IFormLoginValues {
  email: string;
  password: string;
}

export interface IFormChangePassword {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface IFormAddRestaurant {
  name: string;
  address: string;
  description: string;
}
export interface IFormAddReview {
  rating: number;
  title: string;
  comment: string;
}