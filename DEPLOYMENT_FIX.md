# Ambica deployment fix

The frontend and Express API can now be deployed in the same Vercel project.

## What was fixed
- Added `api/index.js` as the Vercel serverless entry point.
- Changed `backend/server.js` to export the Express app and only call `listen()` during local development.
- Added the backend runtime dependencies to the root `package.json` so Vercel installs them.
- Added a Vercel rewrite so `/api/*` reaches Express instead of the SPA `index.html`.
- Frontend API calls continue to use `API_BASE`; when `VITE_API_URL` is empty, they correctly use same-origin `/api`.
- Removed the real `backend/.env` from the deployable project.

## Vercel environment variables
Set these in the Vercel project:

- `MONGO_URI` = your MongoDB Atlas connection string
- `JWT_SECRET` = a strong random secret
- `NODE_ENV` = `production`
- `FRONTEND_URL` = `https://ambicaalumind.com` (and add the `www` domain too if you use it)
- Email variables if email features are used
- Cloudinary variables if image uploads are used

Do **not** put `MONGO_URI`, `JWT_SECRET`, email passwords, or Cloudinary secrets in Git or frontend `VITE_*` variables.

## Test after deployment
Open:

`https://ambicaalumind.com/api`

Then test:

`https://ambicaalumind.com/api/products`

The second URL must return JSON such as `{ "success": true, "data": [...] }`.
