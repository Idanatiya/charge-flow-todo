export const routes = {
  root: {
    path: "/",
  },
  home: {
    path: "/",
  },
  notFound: {
    path: "*",
  },
  searchParams: {
    userId: "userId",
    hideCompleted: "hideCompleted",
  },
} as const;
