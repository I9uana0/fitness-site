export type email = string;
export type password = string;

export interface LoginData {
  email: email;
  password: password;
}

export interface RegisterData {
  name: string;
  phone: string;
  dateBirth: string;
  email: email;
  password: password;
}
