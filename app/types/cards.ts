import { string } from "mobx-state-tree/dist/internal";

export enum CardType {
  Spot = "Spot",
  Skater = "Skater",
  Trick = "Trick",
  Gear = "Gear",
  Crew = "Crew",
  Event = "Event",
}

export enum FeatureType {
  Gap = "Gap",
  Ledge = "Ledge",
  Handrail = "Handrail",
  Hip = "Hip",
  Wallride = "Wallride",
  Hubba = "Hubba",
  Bank = "Bank",
}

export interface Card {
  id: number;
  name: string;
  type: CardType;
}

export interface Feature {
  type: FeatureType;
}

export interface SpotCard extends Card {
  features: Feature[];
  difficulty: number;
}

export interface TrickCard extends Card {
  score: number;
  trickType: string;
}

export interface GearCard extends Card {
  price: string;
  description: string;
}

export interface SkaterCard extends Card {
  tricks: {
    air: number;
    slide: number;
    grind: number;
  };
  bonus: string[];
}

export interface CrewCard extends Card {}

export interface EventCard extends Card {}

export type PlayerCard = TrickCard | GearCard | CrewCard | EventCard;

export type GameCard =
  | SpotCard
  | TrickCard
  | GearCard
  | SkaterCard
  | CrewCard
  | EventCard;
