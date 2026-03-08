# Scripts

## Seed Sanity (`seed-sanity.ts`)

Seeds your Sanity dataset with dummy incidents, victims, and timeline events so you can develop and demo the app without manual data entry.

### 1. Create a write token

1. Go to [sanity.io/manage](https://sanity.io/manage) and select your project.
2. Open **API** → **Tokens**.
3. Add a token with **Editor** or **Administrator** permissions.
4. Copy the token.

### 2. Set environment variables

In `.env.local` (or export in your shell):

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production   # or "development"
SANITY_API_WRITE_TOKEN=your_token_here
```

Use the same `projectId` and `dataset` as in your app.

### 3. Run the seed

```bash
pnpm run seed:sanity
```

Or with `npm run seed:sanity` / `yarn seed:sanity`.

The script loads `.env.local` automatically when run from the project root. It creates 5 sample incidents (with EN/BN titles and descriptions), assigns random divisions/districts, and adds victims and timeline events to each. You can run it again anytime; it replaces the same seeded documents so you won’t get duplicates.
