export const compareSearchParams = (c1: string | null, c2: string | null) =>
  c1 === c2;

export const prettyPrint = (salary: number) =>
  new Intl.NumberFormat("hu-HU", {
    style: "currency",
    currency: "HUF",
    maximumFractionDigits: 0,
  }).format(salary);
