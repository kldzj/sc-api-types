## sc-api-types

This package includes response typings for the [Star Citizen Wiki API](https://docs.star-citizen.wiki/). Currently types are limited to Star Systems, Ships and their respective relations.

### Usage

#### Include Relationships

You can include the objects relationships by passing instruction to the generic response type, like this:

```typescript
import { ShipResponse } from 'sc-api-types';

// now intersects with { components: { data: ShipComponent[] } }
type ShipWithComponentsResponse = ShipResponse<{ components: true }>;
```

#### Correct Locale Typing

If you're using the APIs locale parameter you'll want the response types to reflect the correct description property type. You can tell the response type that you're using the locale parameter like this:

```typescript
import { ShipResponse } from 'sc-api-types'M

// now descriptions are of type string instead of the locales object
type ShipWithStringDescs = ShipResponse<{}, 'en_EN'>
```

### Issues

If you're facing issues with these typings please do not hesistate to [create an issue](https://github.com/kldzj/sc-api-types/issues/new) or [pull request](https://github.com/kldzj/sc-api-types/fork).
