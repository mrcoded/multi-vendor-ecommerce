export interface VendorProps {
  id: string;
  name: string;
  email: string;
  vendorProfile: {
    phone: string;
    email: string;
    userId: string;
    code: string;
    terms: string | null;
    firstName: string;
    lastName: string;
    isActive: boolean;
    imageUrl: string | null;
    physicalAddress: string | null;
    contactPerson: string | null;
    contactPersonPhone: string | null;
    terms: string | null;
    notes: string | null;
    products: string[];
  };
}
