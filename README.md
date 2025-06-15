# Payment Service – MERN + PayHere Sandbox

This project is a MERN stack payment gateway integration, using the PayHere sandbox for secure payment processing.

## Features

- Initiate payments via PayHere (sandbox)
- Store payment records in MongoDB
- Simple React frontend for payment form and status pages

## Prerequisites

- Node.js (v18+ recommended)
- MongoDB Atlas account (or local MongoDB)
- PayHere Sandbox account: https://sandbox.payhere.lk/

## Setup Instructions

### 1. PayHere Sandbox Setup

1. **Create a PayHere Sandbox Account:**  
   - Go to https://sandbox.payhere.lk/, sign up, and log in.

2. **To Get Merchant ID and Merchant Secret:**
   - Go to Integrations → Add Domain/App
   - Set Domain/App: Domain 
   - Set Domain Name: `localhost` (or `127.0.0.1`)
   - Save and ensure the domain/app is active.
     <img width="960" alt="image" src="https://github.com/user-attachments/assets/a9fe6073-48c4-4cdd-b28f-10b3410f6579" />
     
   - Integration screen displays the **Merchant ID, Merchant Secret**
     <img width="960" alt="image" src="https://github.com/user-attachments/assets/dbd545f7-574a-4221-8bf0-1ffbdff6641a" />

   - Copy the generated Merchant ID and Merchant Secret to .env file.


### 2. Backend Setup

1. Copy `.env.example` to `.env` in the Payment_Service_Backend/ directory and fill it with your actual credentials.

2. Install dependencies:
   ```sh
   cd Payment_Service_Backend
   npm install
   ```

3. Start the backend server:
   ```sh
   npm run dev
   ```

### 3. Frontend Setup

1. Copy `.env.example` to `.env` in `Payment_Service_Frontend/` and fill with your actual credentials.

2. Install dependencies:
   ```sh
   cd Payment_Service_Frontend
   npm install
   ```
3. Start the frontend:
   ```sh
   npm run dev
   ```
   - Visit [http://localhost:5173](http://localhost:5173) in your browser.

## Testing Payments

- Use the frontend payment form to initiate a payment.
- You’ll be redirected to PayHere’s sandbox checkout.
- Use a test card for transactions. Visit https://support.payhere.lk/sandbox-and-testing to get test card details.
  - Visa: `4123 4567 8912 3456`  
  - CVV: `123`  
  - Expiry: `12/25`
- On completion/cancel, you’ll be redirected to the appropriate status page.
- Check MongoDB for payment records.

## Notes

- Sandbox transactions are free and use dummy data.
- Keep your secrets in `.env` files (do not commit them).
- For production, use live PayHere credentials and update URLs accordingly.

## Support

- For PayHere issues: [support@payhere.lk](mailto:support@payhere.lk)



