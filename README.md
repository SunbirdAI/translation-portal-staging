# Staging Translation Portal

## Description

Translation Portal is a Vite-powered React application for performing translations efficiently. It integrates with Sunbird AI's translation API to provide seamless language translation.

## Features

- **Fast Development** with Vite
- **React Router** for seamless navigation
- **API Integration** with `api-staging.sunbird.ai`

## Tech Stack

- **Frontend:** Vite + React
- **Styling:** Tailwind CSS, Material-UI

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- npm or yarn package manager

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/SunbirdAI/translation-portal-staging.git
   ```
2. **Navigate to the project directory:**
   ```bash
   cd translation-portal-react
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Create a `.env` file in the root directory** and add the following environment variables:

   ```bash
   VITE_SB_API_URL=<your_api_url>  # API endpoint for translation services
   VITE_SB_API_TOKEN=<your_api_token>  # Authentication token for API requests
   VITE_GA4_TRACKING_ID=<your_tracking_id>  # Google Analytics tracking ID
   VITE_GA4_MEASUREMENT_ID=<your_measurement_id>  # GA4 measurement ID for analytics
   VITE_FEEDBACK_URL=<your_feedback_url>  # URL for submitting user feedback

   ```

5. **Start the development server:**

   ```bash
   npm run dev
   ```

   or

   ```bash
   npm start
   ```

   The application will be available at `http://localhost:3000/`

6. **Running tests**
   Run tests on the terminal

   ```bash
   npm run cy:run
   ```

   Run tests on interface

   ```bash
   npm run cy:open
   ```
