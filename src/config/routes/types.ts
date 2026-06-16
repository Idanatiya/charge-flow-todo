import type { routes } from "./routes";

export type Routes = typeof routes;

export type RoutePath =
  | Routes["root"]["path"]
  | Routes["home"]["path"]
  | Routes["notFound"]["path"];

export type SearchParamKey =
  Routes["searchParams"][keyof Routes["searchParams"]];
