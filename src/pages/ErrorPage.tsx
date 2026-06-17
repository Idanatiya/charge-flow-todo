import { Link, useRouteError } from "react-router";

import { Placeholder } from "../components/ui/Placeholder/Placeholder";
import { routes } from "../config/routes";

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return "Unknown error";
}

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <Placeholder>
      <h1>Something went wrong</h1>
      <p>{getErrorMessage(error)}</p>
      <Link to={routes.home.path}>Back to home</Link>
    </Placeholder>
  );
}
