export type userId = string;
export type email = string;
export type password = string;
export type SubscriptionStatus = "ACTIVE" | "CANCELLED" | "EXPIRED";
export interface LoginData {
  email: email;
  password: password;
}

export interface RegisterData {
  name: string;
  surname: string;
  phone: string;
  dateOfBirth: string;
  email: email;
  password: password;
}

export interface Subscription {
  id: string;
  userId: string;
  subscriptionTypeId: string;
  startDate: string;
  endDate: string;
  pricePaid: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export type error = {
  message: "";
  status: "";
};
