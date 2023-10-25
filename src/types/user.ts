import { Team } from "./matches";
import { Sport } from "./sports";

export type Preferences = {
  sports?: Sport[];
  teams?: Team[];
  articles?: number[];
  matches?: number[];
};

export type SetPreferences = {
  preferences: Preferences;
};

export type User = {
  email: string;
  id: number;
  name: string;
  preferences: Preferences;
};

export type UserLogin = {
  email: string;
  password: string;
};

export type UserSignup = {
  email: string;
  name: string;
  password: string;
};

export type UserUpdate = {
  current_password: string;
  new_password: string;
};