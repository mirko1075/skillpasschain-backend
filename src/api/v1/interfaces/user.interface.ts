export interface User {
  id: string;
  name: string;
  email: string;
  role?: 'student' | 'certifier' | 'admin'; // Optional role field
  createdAt: Date;
  updatedAt?: Date; // Optional field for tracking updates
}
