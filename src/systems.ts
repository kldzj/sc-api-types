import { Description, Locale } from '.';

export interface StarSystemRelations {
  celestial_objects?: boolean;
  jumppoints?: boolean;
}

export interface Affiliation {
  id: number;
  name: string;
  code: string;
  color: string;
}

export interface JumppointEntryExit {
  id: number;
  system_api_url: string;
  celestial_object_api_url: string;
  status: string; // todo: union with possible values
  designation: string;
}

export interface Jumppoint {
  id: number;
  code: string;
  size: string; // todo: union with possible values
  direction: string; // todo: union with possible values
  entry: JumppointEntryExit;
  exit: JumppointEntryExit;
}

export interface CelestialObject<L extends Locale = null> {
  id: number;
  code: string;
  system_id: number;
  celestial_object_api_url: string;
  name: string | null;
  type:
    | 'BLACKHOLE'
    | 'SATELLITE'
    | 'ASTEROID_FIELD'
    | 'STAR'
    | 'PLANET'
    | 'POI'
    | 'JUMPPOINT'
    | 'MANMADE'
    | 'ASTEROID_BELT';
  age: number | null;
  habitable: boolean | null;
  fairchanceact: boolean | null;
  appearance: string; // todo: union with possible values
  designation: string;
  distance: number;
  latitude: number | null;
  longitude: number | null;
  axial_tilt: number | null;
  orbit_period: number | null;
  info_url: string | null;
  description: Description<L>;
  sensor: {
    population: number;
    economy: number;
    danger: number;
  };
  size: number | null;
  parent_id: number | null;
  time_modified: string;
  affiliation: {
    data: Affiliation[];
  };
  subtype: {
    data:
      | {
          id: number;
          name: string;
          type: string; // todo: union with possible values
        }
      | [];
  };
}

export interface StarSystem<R extends StarSystemRelations = {}, L extends Locale = null> {
  id: number;
  code: string;
  system_api_url: string;
  name: string;
  status: 'N' | 'P' | 'M';
  type: 'SINGLE_STAR' | 'BINARY';
  position: {
    x: number;
    y: number;
    z: number;
  };
  frost_line: number | null;
  habitable_zone_inner: number | null;
  habitable_zone_outer: number | null;
  info_url: string | null;
  description: Description<L>;
  aggregated: {
    size: number;
    population: number;
    economy: number;
    danger: number;
  };
  affiliation: {
    data: Affiliation[];
  };
  jumppoints: R['jumppoints'] extends true ? { data: Jumppoint[] } : undefined;
  celestial_objects: R['celestial_objects'] extends true ? { data: CelestialObject<L>[] } : undefined;
  updated_at: string;
}
