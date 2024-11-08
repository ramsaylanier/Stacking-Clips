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
  id: Number;
  name: String;
  type: CardType;
}

export interface Feature {
  type: FeatureType;
}

export interface SpotCard extends Card {
  features: FeatureType[];
  difficulty: Number;
}

export interface TrickCard extends Card {
  score: Number;
}

export interface GearCard extends Card {}

export interface SkaterCard extends Card {}

export interface CrewCard extends Card {}

export interface EventCard extends Card {}

export type GameCard =
  | SpotCard
  | TrickCard
  | GearCard
  | SkaterCard
  | CrewCard
  | EventCard;
