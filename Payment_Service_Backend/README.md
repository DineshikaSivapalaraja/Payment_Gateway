# Payment Gateway Backend

This is the backend for the Payment Service of the CeylonFlair project. It is built with Node.js, Express, and MongoDB, and is responsible for handling payment processing using PayHere.

## Features
- Initiate payments and generate secure payment hashes
- Handle PayHere webhook notifications for payment status updates
- Store and update payment records in MongoDB
- Notify other services (e.g., Order Service) after successful payments (integration ready)

## How to Run
1. Clone the repository and navigate to the `Payment_Service` folder.
2. Install dependencies:
   ```
   npm install
   ```
3. Make sure you have Node.js and MongoDB Atlas (or a MongoDB instance) set up.
4. Set up your `.env` file with the required environment variables (follow .env file format).
5. Start the server:
   ```
   node index.js
   ```
   Or, if you have a dev script (with nodemon) in your package.json:
   ```
   npm run dev
<<<<<<< HEAD
=======
   ```
>>>>>>> 06aaec3b6a6aa0fe861c03d4a4fb72be489d1a19
   ```

## Testing Payments
- This service is configured to use the PayHere sandbox environment for testing payments: [https://www.payhere.lk/]

## API Endpoints
- `POST /api/payment/initiate-payment` — Initiate a new payment
- `POST /api/payment/notify` — PayHere webhook endpoint




