import { Description, Locale } from '.';

export interface ShipRelations {
  components?: boolean;
}

export interface ShipComponent {
  type: string; // todo: union with possible values
  name: string;
  mounts: number;
  component_size: string; // todo: union with possible values
  category: string; // todo: union with possible values (often an empty string)
  size: string; // todo: union with possible values (often just an dash)
  details: string; // todo: union with possible values (often an empty string)
  quantity: number;
  manufacturer: string;
  component_class: string; // todo: union with possible values
}

export interface Ship<R extends ShipRelations = {}, L extends Locale = null> {
  id: number;
  chassis_id: number;
  name: string;
  slug: string;
  sizes: {
    length: number;
    beam: number;
    height: number;
  };
  mass: number;
  cargo_capacity: number;
  crew: {
    min: number;
    max: number;
    weapon: number;
    operation: number;
  };
  health: number;
  speed: {
    scm: number;
    max: number;
    afterburner: number;
    zero_to_scm: number;
    zero_to_max: number;
    scm_to_zero: number;
    max_to_zero: number;
  };
  fuel: {
    capacity: number;
    intake_rate: number;
    usage: {
      main: number;
      retro: number;
      vtol: number;
      maneuvering: number;
    };
  };
  quantum: {
    quantum_speed: number;
    quantum_spool_time: number;
    quantum_fuel_capacity: number;
    quantum_range: number;
  };
  agility: {
    pitch: number;
    yaw: number;
    roll: number;
    acceleration: {
      x_axis: number;
      y_axis: number;
      z_axis: number;
      main: number;
      retro: number;
      vtol: number;
      maneuvering: number;
      main_g: number;
      retro_g: number;
      vtol_g: number;
      maneuvering_g: number;
    };
  };
  foci: Description<L, false>[];
  production_status: Description<L, false>;
  production_note: Description<L, false>;
  type: Description<L, false>;
  description: Description<L, false>;
  size: Description<L, false>;
  msrp: number | null;
  manufacturer: {
    code: string;
    name: string;
  };
  insurance: {
    claim_time: number;
    expedite_time: number;
    expedite_cost: number;
  };
  updated_at: string;
  missing_translations: (string | number)[];
  version: string;
  components: R['components'] extends true ? { data: ShipComponent[] } : undefined;
}
