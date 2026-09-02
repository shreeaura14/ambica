# Ambica Alum Industries — B2B eCommerce Platform 🏭

![Tech Stack](https://img.shields.io/badge/Stack-MERN-blue?style=for-the-badge) ![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react) ![Node](https://img.shields.io/badge/Node.js-18-green?style=for-the-badge&logo=nodedotjs) ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)

A full-stack, production-ready B2B eCommerce and Quote Management platform built specifically for industrial chemical manufacturing and distribution. Designed for scale, it handles complex industrial transactions including standard retailing, bulk RFQs, real-time payment processing, and granular admin analytics.

## 🌟 Key Features

**Client-Facing:**
*   **Modern Interactive UI:** High-conversion interface featuring glassmorphism, responsive grid layouts, and Tailwind micro-animations.
*   **Intelligent Catalog:** Full-text semantic search, purity-based filtering, and real-time inventory tracking.
*   **Dual-Path Purchasing:** 
    *   *Standard Cart Flow* (for immediate/retail buyers with Razorpay gateway).
    *   *Bulk B2B RFQ Flow* (generate dynamic quotes routed directly to an active sales team).
*   **User Portals:** Detailed history, tracking logs, and downloadable invoices.

**Backend & Admin:**
*   **Comprehensive Admin Dashboard:** Manage users, moderate products (soft-delete, low-stock warnings), review active quotes, and visualize revenue over a trailing 6-month axis via Mongoose Aggregations.
*   **Bank-Grade Security:** JWT stateless authentication, Helmet header hardening, XSS string sanitation, Mongo Injection blocks, and IP Rate Limiting.
*   **Cloud Architecture:** Integrates directly with Cloudinary for fast, borderless file hosting and Nodemailer for SMTP transactional triggers.

## 🏗️ Architecture Summary

*   **Frontend:** React (Vite) + TypeScript + Context API + Tailwind CSS + Lucide Icons.
*   **Backend:** Node.js + Express.js + RESTful Architecture.
*   **Database:** MongoDB Atlas (Mongoose ODM with advanced geospatial/text indexing).
*   **Infrastructure:** Cloudinary (Asset CDN), Email SMTP (Transactional), Razorpay (Payment Gateway Simulation).
*   **DevOps:** Environment separation `.env`, Git-ignored secrets, automated NPM execution streams.

## 🚦 Local Installation

1.  **Clone the Repo & Install Dependencies**
    ```sh
    # Install frontend dependencies
    npm install
    
    # Install backend dependencies
    cd backend
    npm install
    
    # If production, run: npm install helmet express-mongo-sanitize xss-clean express-rate-limit cloudinary
    ```

2.  **Environment Variables**
    Copy `backend/.env.example` to `backend/.env` and update the local MongoDB URI strings and JWT mock secrets.

3.  **Run Development Servers**
    ```sh
    # Terminal 1: Backend
    cd backend
    npm run dev
    
    # Terminal 2: Frontend
    cd ..
    npm run dev
    ```
    Your frontend will map automatically to the backend over Vite's internal `proxy`.

## 🔐 Demo Credentials

Upon launching, use the following credentials to explore the Admin portal capabilities. Make sure you have created this document inside your database and explicitly set `role: "admin"`.

*   **Admin Access:** Ensure your database document contains `role: "admin"`
*   **User Login (Standard):** Create any account via the `/register` screen.

## 🧪 Testing

The backend is built with test-driven integrity in mind. We use **Jest & Supertest** to execute smoke and boundary tests without mutating the primary database.

```sh
cd backend
npm test
```

***

*Developed by the DeepMind Engineering Team template scaffolding. Free for commercial enterprise use.*