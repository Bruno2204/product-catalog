1. Create the Vite project — scaffold the React app with npm create vite@latest, install react-router-dom and axios

2. Folder structure — set up api/, context/, pages/, and components/ directories before writing any code

3. API layer (axios) — create a shared axios instance with a base URL and automatic JWT token attachment, plus separate products.js and cart.js API files

4. Context — Auth & Cart — build AuthContext for login/logout state and CartContext with useReducer for cart operations

5. App.jsx — routing — define all routes with react-router-dom, wrap the app in both providers, and add the ProtectedRoute component that redirects unauthenticated users to login

6. CatalogPage — product listing — the main page with search and category filter inputs, a useEffect that re-fetches products when filters change, and a responsive CSS grid of ProductCard components

7. CartPage & checkout — loads the cart from the server on mount, handles item removal, and calls the checkout endpoint then redirects to the order confirmation page

8. Environment & CORS — configure .env files for dev and production API URLs, set up CORS on the Express server, and run through a pre-deployment checklist

TODO:
- Improve CartButton
- Imprement Checkout
- Implement Login