import { createRootRoute, Outlet, Link } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <nav className="navigation">
        <Link to="/">Home</Link> |{" "}
        <Link to="/quizzes/the-office">The Office</Link>
      </nav>
      <main id="content-wrapper">
        <Outlet />
      </main>
    </>
  ),
});
