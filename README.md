````markdown
# E-Learning Platform

An online platform to facilitate learning through courses and tutorials for students and teachers. This project is built using **NestJS** for the backend, **PostgreSQL** for the database, and integrates user authentication and role-based access for both students and teachers.

## Features

- **User Authentication**: Secure login and registration for students and teachers.
- **Role-Based Access**: Different permissions and functionalities based on user role (student/teacher).
- **Course Management**: Teachers can create and manage courses, while students can view and enroll in them.
- **Interactive Learning**: Students can track their progress through the course materials.
- **Payment Integration**: Stripe and PayPal integration for handling course payments.

## Tech Stack

- **Backend**: NestJS
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Token)
- **Payment Processing**: Stripe, PayPal
- **File Upload**: Cloudinary
- **Testing**: Jest for unit and integration testing

## Installation

### Prerequisites

Make sure you have the following installed:

- **Node.js** (LTS version recommended)
- **PostgreSQL** (Locally or Cloud PostgreSQL)
- **Stripe** and **PayPal** accounts for payment gateway integration
- **Cloudinary** account for file uploads

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/ALaamohamed581/E-Learning.git
   cd E-Learning
   ```
````

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure the `.env` file:

   Create a `.env` file in the root directory and configure the following variables:

   ```env
   DATABASE_URL=postgres://username:password@localhost:5432/elearning
   OAUTH_CLIENT_ID=your-oauth-client-id
   OAUTH_CLIENT_SECRET=your-oauth-client-secret
   CSRF_SECRET=your-csrf-secret
   TEACHER_REFRESH_TOKEN_SECRET=your-teacher-refresh-token-secret
   TEACHER_AUTH_TOKEN_SECRET=your-teacher-auth-token-secret
   ADMIN_AUTH_TOKEN_SECRET=your-ADMIN-auth-token-secret
   ADMIN_REFRESH_TOKEN_SECRET=your-ADMIN-refresh-token-secret
   COOKIE_SECRET=your-cookie-secret
   STUDENT_REFRESH_TOKEN_SECRET=your-student-refresh-token-secret
   STUDENT_AUTH_TOKEN_SECRET=your-student-auth-token-secret
   EMAIL_USERNAME=your-email-username
   EMAIL_PASSWORD=your-email-password
   EMAIL_HOST=smtp.your-email-host.com
   EMAIL_PORT=587
   CLOUDINARY_CLOUD_KEY=your-cloudinary-cloud-key
   CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
   CLOUDINARY_CLOUD_SECRET=your-cloudinary-cloud-secret
   STRIPE_API_KEY=your-stripe-api-key
   PAYPAL_CLIENT_ID=your-paypal-client-id
   PAYPAL_CLIENT_SECRET=your-paypal-client-secret
   PORT=8000
   ```

4. Run the application:

   ```bash
   npm run start:dev
   ```

   The application should now be running at `http://localhost:3000`.

## Payment Integration

- **Stripe**: Used for handling payments related to course enrollments. You will need to configure your **Stripe API key**.
- **PayPal**: Integrated for an additional payment method. Configure **PayPal client ID** and **client secret**.

## File Upload

- **Cloudinary** is used for storing images, videos, and other media files. Set up your **Cloudinary credentials** in the `.env` file.

## Testing

Run tests with:

```bash
npm run test

```
