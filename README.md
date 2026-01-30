
# AFCS Yola Alumni Platform

Welcome to the official **Air Force Comprehensive School (AFCS) Yola Alumni** platform. This application serves as a central hub for alumni to connect, network, share opportunities, and stay updated with school events.

## Features

- **Directory**: Browse and search for fellow alumni profiles. (Requires Login)
- **Events**: Stay updated with upcoming reunions and school events. (Requires Login)
- **Jobs**: Share and find job opportunities within the alumni network. (Requires Login)
- **Network**: Connect with other alumni for professional networking. (Requires Login)
- **Authentication**: secure login and registration using Firebase Auth.
- **PWA Support**: Installable as a Progressive Web App on mobile and desktop.

## Technologies Used

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS, Shadcn/ui
- **Backend / Auth**: Firebase (Authentication, Firestore)
- **PWA**: vite-plugin-pwa

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn or bun

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd afcs-yola-alumni
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

### Building for Production

To build the application for production:

```bash
npm run build
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
