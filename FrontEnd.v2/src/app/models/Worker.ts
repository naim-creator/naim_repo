export interface Worker {
  id?: any;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  image: string;
  profession?: string;
  company: { id: string };
}
