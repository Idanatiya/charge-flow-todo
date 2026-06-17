export const queryKeys = {
  users: ["users"] as const,
  todos: (userId: number) => ["todos", userId] as const,
};
