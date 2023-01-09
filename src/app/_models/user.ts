export interface User {
  id: number;
  firstName: string;
  lastName: string;
  gender: 'male' | 'female';
  birthDate: string;
  email: string;
  isDeleted?: boolean;
}
