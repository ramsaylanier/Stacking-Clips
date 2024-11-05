export enum CardType {
  Spot,
  Skater,
  Trick,
  Gear,
  Crew,
  Event,
}

export enum FeatureType {
  Gap,
  Ledge,
  Handrail,
  Hip,
  Wallride,
  Hubba,
  Bank,
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
  features: [FeatureType];
}

export interface TrickCard extends Card {
  score: Number;
}

export interface GearCard extends Card {}

export interface SkaterCard extends Card {}

export interface CrewCard extends Card {}

export interface EventCard extends Card {}
