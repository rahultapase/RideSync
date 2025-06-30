# RideSync

RideSync is a ride-sharing application that connects users with nearby drivers for safe and comfortable journeys across cities. This project is built using Next.js, React, TypeScript, and Tailwind CSS.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Configuration](#configuration)
- [Scripts](#scripts)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Clone the Repository:
```sh
 git clone https://github.com/rahultapase/ridesync.git
```

### Install Dependencies:
```sh
 cd ridesync
 npm install
```

### Set Up Environment Variables:
Create a `.env.local` file in the root directory and add your environment variables.

## Usage
To start the development server, run:
```sh
 npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the application in action.

## Features
- **User Authentication**: Register, log in, and manage user profiles.
- **Ride Booking**: Set pickup/destination, view route, choose ride type, and see fare estimates.
- **Ride History**: View past rides with details (date, fare, driver name).
- **Profile Management**: Update profile details and ride statistics.
- **Payment Integration**: Manage payment methods using Stripe API.
- **Ride Sharing**: Share rides with others and split fares.
- **Feedback System**: Rate rides and leave comments.
- **Notification System**: Get real-time ride updates.
- **Live Chat**: Chat with drivers via Socket.io.
- **Dark Mode**: Toggle between light and dark themes.
- **Mobile Responsiveness**: Works across all screen sizes.

## Configuration
### Tailwind CSS
Tailwind CSS is configured in `tailwind.config.ts`. You can customize the theme and add plugins as needed.

### Next.js
Next.js settings are available in `next.config.js` and `next.config.mjs`. Modify these files to customize image domains, Webpack configurations, and other Next.js features.

## Scripts
- `npm run dev` - Starts the development server.
- `npm run build` - Builds the application for production.
- `npm run start` - Starts the production server.
- `npm run lint` - Runs ESLint for code linting.

## Folder Structure
```
.
├── .next/                  # Next.js build output
├── app/                    # Application pages and components
│   ├── about/              # About page
│   ├── feedback/           # Feedback page
│   ├── history/            # Ride history page
│   ├── page.tsx            # Home page
│   ├── layout.tsx          # Root layout
│   └── globals.css         # Global styles
├── components/             # Reusable UI components
│   ├── Booking/            # Booking components
│   ├── Map/                # Map components
│   └── UI/                 # UI components
├── context/                # React context providers
├── data/                   # Static data
├── lib/                    # Utility functions and libraries
├── public/                 # Public assets
├── server/                 # Server-side code
├── styles/                 # Additional styles
├── utils/                  # Utility functions
├── .env.local              # Local environment variables
├── .eslintrc.json          # ESLint configuration
├── .gitignore              # Git ignore file
├── next-env.d.ts           # Next.js environment types
├── next.config.js          # Next.js configuration (CommonJS)
├── next.config.mjs         # Next.js configuration (ESM)
├── package.json            # NPM package configuration
├── postcss.config.mjs      # PostCSS configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project documentation
```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

