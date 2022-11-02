export enum UserType {
  USER,
  ADMIN,
}

export interface JwtPayload {
  address: string;
  type: UserType;
}

export interface JwtResponse {
  accessToken: string;
  refreshToken: string;
}
