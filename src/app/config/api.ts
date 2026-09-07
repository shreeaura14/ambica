/**
 * API base URL.
 *
 * Local development uses Vite's /api proxy when VITE_API_URL is not set.
 * Production deployments MUST set VITE_API_URL to the public URL of the
 * Express backend, for example: https://api.example.com
 */
export const API_BASE = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
