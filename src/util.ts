import { Locale, ShipRelations, StarSystemRelations, ValidLocale } from '.';

export type Entity = 'ship' | 'system';
export type IncludeMap<E extends Entity> = E extends 'ship'
  ? ShipRelations
  : E extends 'system'
  ? StarSystemRelations
  : {};

export interface ApiUrlOptions<E extends Entity> {
  limit?: number;
  locale?: ValidLocale;
  include?: IncludeMap<E>;
}

export interface ApiUrl<E extends Entity, I extends IncludeMap<E> | undefined> {
  include: I;
  url: string;
  locale: Locale;
  entity: Entity;
}

const PATH_MAP: Record<Entity, string> = {
  ship: 'ships',
  system: 'starmap/starsystems',
};

export function getApiUrlBuilder<E extends Entity>(entity: E) {
  const base = `https://api.star-citizen.wiki/api/${PATH_MAP[entity]}`;
  return function apiUrlBuilder<O extends ApiUrlOptions<E>>(
    codeOrId?: string | null,
    opts?: O
  ): ApiUrl<E, O['include']> {
    const params = Object.entries(opts ?? {})
      .map(
        ([key, value]) =>
          `${key}=${encodeURIComponent(typeof value === 'object' ? Object.keys(value).join(',') : value)}`
      )
      .join('&');

    return {
      entity,
      locale: opts?.locale ?? null,
      include: opts?.include ?? {},
      url: `${base}${codeOrId ? `/${codeOrId}` : ''}?${params}`,
    };
  };
}

export const urlBuilder = {
  ship: getApiUrlBuilder('ship'),
  system: getApiUrlBuilder('system'),
};
