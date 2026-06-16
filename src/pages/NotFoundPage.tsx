import { Link } from "react-router";

import { routes } from "../config/routes";

export default function NotFoundPage() {
  return (
    <section id="center">
      <h1>404</h1>
      <p>Page not found.</p>
      <Link to={routes.home.path}>Back to home</Link>
    </section>
  );
}
