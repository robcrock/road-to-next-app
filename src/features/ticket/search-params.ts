import { createSearchParamsCache, parseAsString } from "nuqs/server";

export const searchParser = parseAsString.withDefault("").withOptions({
  // we set it to false when we want to requery our server
  shallow: false,
  clearOnDefault: true,
});
export const sortParser = parseAsString.withDefault("newest").withOptions({
  // we set it to false when we want to requery our server
  shallow: false,
  clearOnDefault: true,
});

export const searchParamsCache = createSearchParamsCache({
  search: searchParser,
  sort: sortParser,
});

export type ParsedSearchParams = Awaited<
  ReturnType<typeof searchParamsCache.parse>
>;
