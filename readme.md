# Show Quizzes

Modern quiz application built with Vite, React 18, and TanStack Router.

## Setup

```sh
npm install
```

## Development

```sh
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

## Build

```sh
npm run build
```

Builds the app for production to the `dist` folder.

## Preview Production Build

```sh
npm run preview
```

## Deployment

Deploy to Vercel:

```sh
npm run deploy
```

## Tech Stack

- **Vite 5** - Fast build tool and dev server
- **React 18** - UI library with hooks
- **TanStack Router** - Type-safe routing
- **PostCSS + Autoprefixer** - CSS processing

## Architecture

- `src/routes/` - File-based routing
- `src/components/` - Reusable React components
- `src/hooks/` - Custom hooks (quiz state management)
- `src/data/` - Quiz JSON data
- `src/quizRegistry.js` - Quiz configuration registry

## Adding New Quizzes

1. Create JSON file in `src/data/` following the schema in `the-office.json`
2. Add entry to `src/quizRegistry.js`
3. Quiz will be available at `/quizzes/{quiz-id}`
