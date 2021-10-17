import { Ship, ShipRelations } from './ships';
import { StarSystem, StarSystemRelations } from './systems';

export type ValidLocale = 'de_DE' | 'en_EN';
export type Locale = null | ValidLocale;
export type Nullable<T = any> = T | null;

export interface ApiResponse<T = any> {
  data: T;
  meta: {
    processed_at: string;
    valid_relations: string[];
  };
  pagination?: {
    total: number;
    count: number;
    per_page: number;
    current_page: number;
    total_pages: number;
    links: {
      previous?: string;
      next?: string;
    };
  };
}

export type Description<L extends Locale, N extends boolean = true> = L extends null
  ? { [key in ValidLocale]?: string }
  : N extends true
  ? Nullable<string>
  : string;

export type ShipResponse<R extends ShipRelations = {}, L extends Locale = null> = ApiResponse<Ship<R, L>>;

export type ShipsResponse<R extends ShipRelations = {}, L extends Locale = null> = ApiResponse<Array<Ship<R, L>>>;

export type StarSystemResponse<R extends StarSystemRelations = {}, L extends Locale = null> = ApiResponse<
  StarSystem<R, L>
>;

export type StarSystemsResponse<R extends StarSystemRelations = {}, L extends Locale = null> = ApiResponse<
  Array<StarSystem<R, L>>
>;

export * from './ships';
export * from './systems';
