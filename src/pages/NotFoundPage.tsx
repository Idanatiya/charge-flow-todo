import { Link } from "react-router";

import { Placeholder } from "../components/ui/Placeholder/Placeholder";
import { routes } from "../config/routes";

export default function NotFoundPage() {
  return (
    <Placeholder>
      <h1>Oooops!</h1>
      <p>Page not found.</p>
      <Link to={routes.home.path}>Back to home</Link>
    </Placeholder>
  );
}
