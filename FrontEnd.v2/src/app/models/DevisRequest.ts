export interface DevisRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  available_area?: number;
  building_type?: string;
  company?: { id: string };
  consumption?: number;
  electricity_access?: boolean;
  id?: any;
  location?: string;
  post_code?: string;
  roof_type?: string;
  status?: string;
}
