export interface IUserSettings {
  practiceNumber?: number;
  sound?: boolean;
  isColorWeakness?: boolean;
}

export interface IUser extends IUserSettings {
  id: string;
  refreshToken: string;
}
