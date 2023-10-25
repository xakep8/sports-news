import { Team } from "./matches";
import { Sport } from "./sports";

export interface Article {
  id: number;
  title: string;
  summary: string;
  thumbnail: string;
  sport: Sport;
  date: string;
  content: string;
  teams: Team[];
}