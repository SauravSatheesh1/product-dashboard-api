# Backend API for Product Dashboard

This is the backend API for a Product Dashboard built with Node.js, Express, TypeScript, and PostgreSQL. It provides endpoints for user authentication, product management, and CSV file upload for bulk product import.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Technology Stack](#technology-stack)
3. [Getting Started](#getting-started)
   - [Cloning the Repository](#cloning-the-repository)
   - [Installing Dependencies](#installing-dependencies)
   - [Environment Variables](#environment-variables)
4. [Running the Application](#running-the-application)

## Prerequisites

Before you begin, ensure you have the following installed on your system:
- Node.js (v21 or later)
- npm (v10 or later)
- PostgreSQL
- Git

## Technology Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- TypeORM (for database ORM)
- JSON Web Tokens (for authentication)
- bcrypt (for password hashing)
- express-validator (for input validation)


## Getting Started

### Cloning the Repository

1. Open your terminal.
2. Clone the repository:

### Installing Dependencies

1. Navigate to the project directory: `cd product-dashboard-api`
2. Install the dependencies: `npm install`

### Environment Variables

This project uses environment variables for configuration. Create a `.env` file in the root directory with the following variables:

Replace the placeholder values with your actual configuration:
- `PORT`: The port on which the server will run (default is 3000)
- `JWT_SECRET`: A secure secret key for JWT token generation
- `DATABASE_URL`: Your PostgreSQL database connection string

**Important:** Never commit your `.env` file to version control. Add it to your `.gitignore` file.

### Setting Up Environment Variables

Refer to the [Environment Variables](#environment-variables) section for detailed information on setting up your `.env` file.

## Running the Application

### Development Mode

1. Start the development server: `npm run dev`

### Production Build

1. Build and run the application: `npm run start`
