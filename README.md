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
   DATABASE_URL= 
   OAUTH_CLIENT_ID= 
   OAUTH_CLIENT_SECRET= 
   CSRF_SECRET= 
   TEACHER_REFRESH_TOKEN_SECRET= 
   TEACHER_AUTH_TOKEN_SECRET= 
   ADMIN_AUTH_TOKEN_SECRET= 
   ADMIN_REFRESH_TOKEN_SECRET= 
   COOKIE_SECRET= 
   STUDENT_REFRESH_TOKEN_SECRET= 
   STUDENT_AUTH_TOKEN_SECRET= 
   EMAIL_USERNAME= 
   EMAIL_PASSWORD= 
   EMAIL_HOST= 
   EMAIL_PORT= 
   CLOUDINARY_CLOUD_KEY= 
   CLOUDINARY_CLOUD_NAME= 
   CLOUDINARY_CLOUD_SECRET= 
   STRIPE_API_KEY= 
   PAYPAL_CLIENT_ID=y 
   PAYPAL_CLIENT_SECRET= 
   PORT=8000
   ```

4. Run the application:

   ```bash
   npm run start:dev
   ```

   The application should now be running at `http://localhost:8000`.

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
