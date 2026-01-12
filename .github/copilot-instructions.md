# Show Quizzes - AI Coding Instructions

## Project Architecture

This is a Next.js 9 (legacy) quiz app using React class components and serverless deployment via Vercel (now.sh). Each quiz is a standalone page that manages game state entirely client-side.

**Core Pattern**: Quiz pages in `pages/` import JSON data from `db/`, manage state via class components, and orchestrate presentational components from `components/`.

## File Organization

- **Pages** (`pages/*.js`): Each quiz is a page implementing the full game loop (e.g., `the-office.js`)
- **Quiz Data** (`db/*.json`): Question data with structure: `{ defaults: {...}, questions: [...] }`
- **Components** (`components/`): Pure presentational components receiving props (no internal state except `response.js`)

## Key Patterns

### Quiz Data Structure

```json
{
  "defaults": {
    "isAnswered": false,
    "isCorrect": false,
    "response": null,
    "responses": ["incorrect text", "correct text", "default text"]
  },
  "questions": [
    {
      "question": "Question text?",
      "answers": ["option1", "option2", "option3", "option4"],
      "answer": 0, // index of correct answer
      "episode": "Episode Name"
    }
  ]
}
```

### Quiz Page State Management

Quiz pages use class components with:

- `getInitialProps()` to load first question on page load
- State includes: `currQuesNum`, `currQuesData`, `isAnswered`, `isCorrect`, `scores`, `gameOver`
- Flow: Answer → aggregate score → next question OR show results
- See [pages/the-office.js](pages/the-office.js) for reference implementation

### Component Conventions

- Components are **functional** and accept destructured props
- File exports default anonymous components: `export default ({ prop1, prop2 }) => ...`
- Components in `components/` are purely presentational except `response.js` (class component)
- CSS classes applied conditionally based on answer state: `'answer correct'` | `'answer incorrect'`

### Styling Approach

- Global CSS in `style.css` imported at top of quiz pages
- CSS variables defined in `:root` (`--color-primary`, `--color-link`)
- State-based class names for visual feedback (e.g., `.answered`, `.correct`, `.incorrect`)

## Development Workflow

```bash
npm run dev      # Start development server (port 3000)
npm run build    # Build for production
npm start        # Run production build locally
npm run deploy   # Deploy to Vercel (legacy now.sh)
```

## Adding New Quizzes

1. Create JSON file in `db/` following the schema above
2. Create page in `pages/` copying `the-office.js` structure
3. Import data: `import data from '../db/your-quiz.json'`
4. Update navigation in `components/layout.js` to add link

## Tech Stack Notes

- **Next.js 9.3** with serverless target (pre-App Router, uses Pages Router)
- **@zeit/next-css** for CSS imports (deprecated but required)
- **React 16.8** class components (no hooks)
- Global CSS imported directly in page components (not `_app.js`)
- Deployment configured in `now.json` for Vercel v2

## Important: Legacy Codebase

This uses **class components**, not functional components with hooks. When editing quiz pages, maintain the class-based pattern with lifecycle methods and `this.state`.
