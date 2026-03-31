export type UserRole = "ADMIN" | "VENDOR" | "USER" | "MODERATOR";
export type UserStatus = "ACTIVE" | "INACTIVE" | "PENDING";

export interface UserProps {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  plan?: string | null;
  status: boolean;
  createdAt: Date;
}

export interface CreateUserProps {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  plan?: string | null;
  status: boolean;
}

export interface UserProfileProps {
  name: string;
  email: string;
  profile: {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    userName: string;
    phone: string;
    streetAddress: string;
    city: string;
    district: string;
    country: string;
    dateOfBirth: Date;
    profileImage: string;
  };
}
