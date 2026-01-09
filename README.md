# Cyber Bandhu | Doorstep Digital Assistance for Students

Community-driven platform connecting rural students with trusted local digital experts for form-filling, scholarship applications, and online services—bridging the digital divide with affordable doorstep support.

## About The Project

Cyber Bandhu addresses digital barriers faced by students in rural and semi-urban areas. Students post requests for help with college admissions, scholarships, exam registrations, or job applications; verified local student experts visit their homes to provide form-filling, payment assistance, and career guidance. The platform reduces dependency on distant or fraudulent cyber cafés, ensures transparency through ratings and tracking, and empowers local youth with part-time earning opportunities.

## Built With

- Frontend: React 18 + TypeScript, Vite, React Router, Tailwind CSS, shadcn/ui (Radix UI), TanStack Query, React Hook Form + Zod, Recharts, Next Themes
- Backend: Node.js, Express 5, MongoDB (Mongoose), JWT, CORS
- Payments: Razorpay / UPI Integration (planned)

## Getting Started

### Prerequisites

- Node.js 16+
- npm
- MongoDB running locally (or remote connection)

### Backend Setup

```bash
cd backend
npm install
# Configure .env with MongoDB URI and JWT secret
node index.js               # or: npx nodemon index.js
```

Update `db/` connection files if using a remote MongoDB instance.

### Frontend Setup

```bash
cd frontend
npm install
npm run dev                 # Vite dev server
```

Open [http://localhost:5173](http://localhost:5173) (default Vite port).

## Usage

- Students/Parents: Create requests for digital assistance (college forms, scholarship applications, exam registrations), track request status, view assigned expert profiles, rate and review completed services.
- Local Experts: Register as digitally skilled volunteers, accept requests, visit homes for doorstep assistance, help with form-filling and payments, build community reputation through feedback.
- Admin/Platform: Verify expert credentials, monitor service quality, manage user reports, ensure secure payments and data privacy.

## Features

- Request-based doorstep service model (no travel required for students)
- Trusted local expert verification and assignment
- Real-time tracking and progress monitoring
- Affordable pricing with transparent payment flows (Razorpay/UPI)
- Ratings, reviews, and service summaries for accountability
- Secure data handling (MongoDB, JWT auth)
- Responsive UI with shadcn/ui components and Tailwind CSS
- Dark/light theme support via Next Themes

## Project Structure

```text
cyber-bandhu/
├─ backend/
│  ├─ db/              # MongoDB connection and models
│  ├─ index.js         # Express app and routes
│  ├─ .env             # Environment config (MongoDB URI, JWT secret)
│  └─ package.json
├─ frontend/
│  ├─ src/
│  │  ├─ components/   # shadcn/ui components (buttons, forms, dialogs, etc.)
│  │  ├─ pages/        # Route pages (home, requests, expert dashboard, profile)
│  │  ├─ hooks/        # Custom React hooks
│  │  ├─ lib/          # Utilities (Tailwind cn, API clients)
│  │  └─ App.tsx
│  ├─ components.json  # shadcn/ui config
│  ├─ vite.config.ts
│  └─ package.json
├─ LICENSE.md
└─ README.md
```

## Scripts

- Backend: `node index.js` (or `npx nodemon index.js` for auto-reload)
- Frontend: `npm run dev`, `npm run build`, `npm run build:dev`, `npm run preview`

## Roadmap

- Integrate Razorpay/UPI payment flows
- Add mobile app (React Native) for broader reach
- Implement geolocation-based expert matching
- Add multilingual support for rural communities
- Launch Cyber-bandhu awareness campaigns and digital literacy workshops
- Scale to multiple regions and partner with schools/NGOs

## Contributing

Contributions are welcome. Please open an issue to discuss proposed changes before submitting a PR.

## License

See [LICENSE.md](LICENSE.md) for details.

## Contact

Tuman Sutradhar

- GitHub: [https://github.com/tumansutradhar](https://github.com/tumansutradhar)
- Email: [connect.tuman@gmail.com](mailto:connect.tuman@gmail.com)
- LinkedIn: [https://www.linkedin.com/in/tumansutradhar/](https://www.linkedin.com/in/tumansutradhar/)

Project Link: [https://github.com/tumansutradhar/cyber-bandhu](https://github.com/tumansutradhar/cyber-bandhu)

## Acknowledgments

- React, Vite, shadcn/ui, and Tailwind CSS communities
- Express, Mongoose, and JWT docs
- Community members supporting digital inclusion initiatives
