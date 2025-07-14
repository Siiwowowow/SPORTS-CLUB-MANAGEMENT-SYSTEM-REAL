🏋️ AthletiQ
🌐 Live: https://a-12-sport-org.web.app
🌐 Server (Vercel): https://a-12-sport-org.vercel.app

AthletiQ is a modern sports organization management platform designed for athletes, members, and admins to handle facility bookings, announcements, payments, and member management seamlessly and responsively.

🚀 Tech Stack
Frontend:
React (19) with Vite for blazing-fast builds and hot module replacement.

React Router (v7) for smooth, nested SPA routing.

Tailwind CSS + DaisyUI for a clean, responsive, accessible design system.

React Responsive Carousel for dynamic sliders showcasing announcements and events.

React Hook Form for advanced, validated forms.

React CountUp for live statistics counters.

React Hot Toast & React Toastify for modern notifications.

React Icons & Lucide React for scalable, beautiful icons.

SweetAlert2 for confirmation modals.

Leaflet & React Leaflet for facility map integration.

State & Data Management:
@tanstack/react-query for efficient data fetching and caching.

Axios for API calls with token support.

Lodash for utility functions.

Authentication & Hosting:
Firebase for:

Authentication (Google & Email/Password)

Hosting frontend

Realtime updates

Payments:
Stripe Integration using:

@stripe/react-stripe-js

@stripe/stripe-js

Secure, PCI-compliant checkout for facility bookings.

🗄️ Backend:
Node.js + Express server.

MongoDB Atlas for scalable, flexible data storage (users, announcements, bookings, payments).

JWT & Firebase token-based protected routes for secure role-based access.

📈 Features
✅ Role-Based Dashboards:

User: Book facilities, view announcements, payment history.

Member: All user features + member-only panels.

Admin: Full control over announcements, bookings, payments, and users.

✅ Secure Stripe Payments: Integrated for facility bookings with payment tracking.

✅ Live Statistics: Counter displays for bookings, users, and facility usage.

✅ Mobile-First & Responsive Design: Fully functional on desktop, tablet, and mobile.

✅ Facility Maps: View facilities using Leaflet maps.

✅ Announcement Slider: Responsive carousel for showcasing updates and events.

✅ Notifications: Clean toast notifications for user actions and confirmations.

"@stripe/react-stripe-js": "^3.7.0",
"@stripe/stripe-js": "^7.4.0",
"@szhsin/react-menu": "^4.4.1",
"@tailwindcss/vite": "^4.1.11",
"@tanstack/react-query": "^5.81.5",
"autoprefixer": "^10.4.21",
"axios": "^1.10.0",
"firebase": "^11.10.0",
"leaflet": "^1.9.4",
"lodash": "^4.17.21",
"lucide-react": "^0.525.0",
"postcss": "^8.5.6",
"react": "^19.1.0",
"react-countup": "^6.5.3",
"react-datepicker": "^8.4.0",
"react-dom": "^19.1.0",
"react-hook-form": "^7.60.0",
"react-hot-toast": "^2.5.2",
"react-icons": "^5.5.0",
"react-leaflet": "^5.0.0",
"react-responsive-carousel": "^3.2.23",
"react-router": "^7.6.3",
"react-toastify": "^11.0.5",
"sweetalert2": "^11.22.2",
"tailwindcss": "<version>"
