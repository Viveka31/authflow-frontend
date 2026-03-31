# AuthFlow — MERN Stack Auth

## Stack
- **Frontend**: React 18, Vite, Tailwind CSS v4, React Router v6
- **Backend**: Node.js, Express, MongoDB/Mongoose, Nodemailer, JWT
- **Auth**: bcryptjs password hashing, JWT sessions, crypto random tokens

## Password Reset Flow
1. User submits email on `/forgot-password`
2. Server checks if email exists in DB
3. If found: generates a `crypto.randomBytes(32)` token, stores it + expiry in DB, sends email
4. User clicks link → frontend calls `/verify-reset-token/:token`
5. Server checks token exists in DB and hasn't expired
6. User sets new password → server updates DB, clears the token
