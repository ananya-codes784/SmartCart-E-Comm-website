# SmartCart — Premium Fashion Clothing E-Commerce Platform

A production-ready, full-stack **MERN** (MongoDB, Express.js, React.js, Node.js) e-commerce web application engineered with an editorial, minimalist fashion brand aesthetic.

---

## 🌟 Overview

SmartCart is built specifically for apparel and fashion retail, featuring clean tailoring aesthetics, genuine database-backed discounting, persistent JWT authentication, dynamic multi-attribute product filtering, and a seamless slide-out cart & checkout workflow.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, JavaScript/TypeScript, React Router DOM v7 |
| **Styling** | Tailwind CSS v4, CSS3 Custom Properties, Google Fonts (*Cormorant Garamond* & *Plus Jakarta Sans*) |
| **Icons** | Lucide React |
| **State Management** | React Context API (`AuthContext`, `CartContext`, `ToastContext`) |
| **HTTP Client** | Axios (configured with automated Bearer JWT request interceptor) |
| **Backend Server** | Node.js, Express.js |
| **Database & ODM** | MongoDB with Mongoose Schemas & Models |
| **Authentication** | JSON Web Tokens (`jsonwebtoken`) & password hashing (`bcryptjs`) |
| **Deployment** | Vercel (Frontend & Serverless API via `vercel.json`) or Render / Railway |

---

## 👔 Clothing Catalog Taxonomy

- **Women**: Dresses, Tops and Shirts, Jeans and Trousers, Kurtis and Ethnic Wear, Co-ord Sets, Jackets and Outerwear
- **Men**: T-shirts and Polos, Shirts, Jeans and Trousers, Ethnic Wear, Jackets and Hoodies
- **Kids**: Boys' Clothing, Girls' Clothing, Kids' Ethnic Wear
- **Curated Collections**: New Arrivals, Best Sellers, and Archive Sale (with genuine database discounts)

---

## 🚀 Key Features

### Frontend Experience
- **Editorial Brand Aesthetic**: High-fashion typography, ivory/charcoal/sage palette, 3-zone Top Bar Contract, zero-pill metadata formatting.
- **Dynamic Catalog & Filtering**: Real-time filtering by Gender, Subcategory, Collection, Size (`XS`–`XXL`), and Price Range ($30–$300) with responsive mobile filter drawers.
- **Contiguous Purchase Module (PDP)**: Dedicated product detail views with multi-image gallery, interactive size selector, size guide modal, fabric/care details, and customer reviews.
- **Cart & Bag Drawer**: Slide-out drawer with free shipping progress threshold ($100 rule), quantity steppers, voucher coupon support (`SMARTCART10`, `ATELIER20`), and subtotal calculations.
- **Multi-Step Checkout**: Shipping address capture, multiple payment methods (Credit/Debit Card, Cash on Delivery, UPI), and instant order placement.
- **Patron Portal**: JWT-secured sign-in and registration, personal order history with live delivery states (`Processing`, `Shipped`, `Delivered`), saved delivery addresses, and wishlist.

### Backend Architecture
- **RESTful API Structure**: Modular architecture organized into `controllers/`, `routes/`, `models/`, and `middleware/`.
- **JWT & bcrypt Security**: Passwords salted and hashed with `bcryptjs` before storage; protected endpoints guarded by custom `protect` auth middleware.
- **Resilient Database Layer**: Native Mongoose models with automatic initialization and persistent data storage.
- **Review Engine**: Endpoint to calculate rolling average star ratings and append customer feedback.
- **Newsletter Subscription**: Backend email validation and patron record storage.

---

## 📡 REST API Reference

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/api/products` | Query products with gender, category, size, price, and sorting filters | Public |
| `GET` | `/api/products/:id` | Fetch garment details and customer reviews | Public |
| `POST` | `/api/products/:id/reviews` | Submit a customer rating and review | Public |
| `POST` | `/api/auth/register` | Register a new user (hashes password with bcrypt, returns JWT) | Public |
| `POST` | `/api/auth/login` | Authenticate existing user credentials | Public |
| `GET` | `/api/auth/profile` | Retrieve authenticated user profile and addresses | Private (Bearer JWT) |
| `POST` | `/api/auth/wishlist` | Toggle a garment in the user's wishlist | Private (Bearer JWT) |
| `POST` | `/api/orders` | Create a new order (supports guest and registered patrons) | Public / Private |
| `GET` | `/api/orders/myorders` | Retrieve order history for the logged-in user | Private (Bearer JWT) |
| `GET` | `/api/orders/:id` | Fetch specific order confirmation receipt | Public |
| `POST` | `/api/newsletter/subscribe`| Validate and subscribe email address to newsletter | Public |

---

## 💻 Local Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local instance or free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster)

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/<your-username>/smartcart-fashion-ecommerce.git
   cd smartcart-fashion-ecommerce
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Add your MongoDB connection string and JWT secret:
   ```env
   PORT=3000
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/smartcart?retryWrites=true&w=majority
   JWT_SECRET=your_jwt_secret_key_here
   ```

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   The application will run on `http://localhost:3000`.

5. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 🌐 Deployment

### Deploy to Vercel
The repository includes a ready-to-use `vercel.json` and `/api/index.ts` serverless configuration.
1. Push your repository to GitHub.
2. Import the project in Vercel.
3. Set the Framework Preset to **Vite**.
4. Add the `MONGODB_URI` and `JWT_SECRET` environment variables.
5. Deploy.

---

## 📄 License
MIT License. Crafted for modern fashion e-commerce.
