export interface Locations {
  name: string;
  crud: string[];
}

export const myLocations: Locations[] = [
  {
    name: "products",
    crud: ["edit", "create"],
  },
  {
    name: "sales",
    crud: ["edit", "create"],
  },
];
