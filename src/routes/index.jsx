import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <main>
      <section>
        <h1>Show Quizzes</h1>
        <p>Test your knowledge of your favorite TV shows!</p>
      </section>
    </main>
  );
}
