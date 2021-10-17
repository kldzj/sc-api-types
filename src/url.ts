import { Locale, ShipRelations, StarSystemRelations } from '.';

export type Entity = 'ship' | 'system';
export type IncludeMap<E extends Entity> = E extends 'ship'
  ? ShipRelations
  : E extends 'system'
  ? StarSystemRelations
  : {};

export interface ApiUrlOptions<E extends Entity> {
  page?: number;
  limit?: number;
  locale?: Locale;
  include?: IncludeMap<E>;
}

export interface ApiUrl<E extends Entity, I extends IncludeMap<E> | undefined, L extends Locale | undefined> {
  locale: L;
  include: I;
  url: string;
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
  ): ApiUrl<E, O['include'], O['locale']> {
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

export const builders = {
  ship: getApiUrlBuilder('ship'),
  system: getApiUrlBuilder('system'),
};
