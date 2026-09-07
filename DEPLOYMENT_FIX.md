# Ambica API deployment fix

## Why the old build failed
The frontend was calling `/api/products` on the frontend host. On Vercel the catch-all rewrite sent that request to `index.html`, so `response.json()` received `<!DOCTYPE html>` and threw:

`Unexpected token '<', "<!DOCTYPE "... is not valid JSON`

The frontend now uses `VITE_API_URL` for every backend request. Local development can leave it empty and use the Vite proxy.

## Production
Set this frontend environment variable before building:

`VITE_API_URL=https://YOUR-BACKEND-DOMAIN`

The backend must be deployed separately as an Express/Node service and must expose:

`GET /api/products`

For example, if the backend is deployed at `https://api.example.com`, set:

`VITE_API_URL=https://api.example.com`

Then rebuild the frontend and redeploy `dist`.

## Backend environment
Set these on the backend host (do not commit real secrets):

- `PORT` — supplied by the hosting platform when applicable
- `MONGO_URI` — MongoDB Atlas connection string
- `JWT_SECRET` — strong random secret
- `NODE_ENV=production`
- `FRONTEND_URL=https://YOUR-FRONTEND-DOMAIN`
- Email/Cloudinary variables if those features are used

## Important
Do not set `VITE_API_URL` to the frontend URL unless the Express API is actually hosted on that same origin.
