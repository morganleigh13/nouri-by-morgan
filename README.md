# Nouri By Morgan

Yoga and body sculpting website for a personal business.

## Project structure

- `client/` – Next.js 16 app using React 19, Tailwind CSS 4, DaisyUI, and Redux Toolkit.
- `server/` – Node.js + Express API prepared for Mongo Atlas and argon2-based owner authentication.

## Client setup

```bash
cd client
npm install
npm run dev
```

The client expects the API at `http://localhost:4000` by default. You can override it with:

```bash
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_OWNER_PORTAL_PREVIEW_PATH=/portal/your-secret-slug/login
```

## Server setup

```bash
cd server
cp .env.example .env
npm install
npm run dev
```

Required environment variables live in `server/.env.example`.

To create the owner password hash, run this inside `server/`:

```bash
node -e "import('argon2').then(async ({ default: argon2 }) => { console.log(await argon2.hash('replace-with-a-strong-password')); })"
```

When `MONGODB_URI` is configured the API stores classes in MongoDB. Without MongoDB the server falls back to in-memory sample data so the UI can still be previewed locally.

## Owner portal

The owner login route is controlled by `OWNER_PORTAL_SLUG` and should stay private. Set the same slug in both the client environment and the server environment so the Next.js route guard and the API agree on the secret path. The matching login URL is:

```text
/portal/<OWNER_PORTAL_SLUG>/login
```

After logging in, the owner can update:

- upcoming classes
- the about page copy
- homepage carousel image URLs
