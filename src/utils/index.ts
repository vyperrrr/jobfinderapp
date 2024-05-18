export const compareSearchParams = (
  searchParams: URLSearchParams,
  query: string,
  toCompareWithJson: string,
) => {
  const currentFilters = searchParams.get(query);
  if (currentFilters !== toCompareWithJson) {
    return true;
  }
  return false;
};
