# Skado Hotel & Suites — "Your Comfort, Our Pride"

Welcome to the official repository for the **Skado Hotel & Suites** website. Located in the heart of Oyo State, Nigeria, Skado Hotel & Suites offers premium hospitality, combining modern comfort with genuine Nigerian warmth.

![Skado Hotel](https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200)

## 🌟 Features

- **Premium Accommodation**: Three curated room categories (Classic Comfort, Deluxe Superior, and Presidential Suite).
- **24/7 Uninterrupted Power**: Reliable generator backup to ensure you're never in the dark.
- **High-Speed WiFi**: Stay connected throughout the premises.
- **AI Concierge (Adé)**: An intelligent assistant powered by Claude AI to help with room inquiries and bookings.
- **Restaurant & Bar**: Fine dining and refreshing drinks available on-site.
- **Secure Environment**: 24-hour security and free on-site parking.
- **Event Facilities**: Conference hall for business meetings and social gatherings.

## 🛠️ Tech Stack

- **Frontend**: Semantic HTML5, Vanilla CSS3 (Custom design system).
- **Interactions**: Vanilla JavaScript (ES6+).
- **Animations**: Custom Intersection Observer implementation for scroll-triggered effects.
- **AI Integration**: Anthropic Claude API (Messages API) for the "Adé" Concierge.
- **Forms**: Formspree integration for booking requests.

## 🚀 Getting Started

### Prerequisites

To run this project locally, you only need a modern web browser.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/skado-hotel.git
   ```
2. Navigate to the project directory:
   ```bash
   cd skado-hotel
   ```
3. Open `index.html` in your browser:
   ```bash
   # On Windows
   start index.html
   # On macOS
   open index.html
   ```

### 🔑 Configuration

#### AI Concierge (Claude API)
The AI assistant requires an Anthropic API key. In `main.js`, ensure the fetch request is properly configured with your credentials if deploying to a backend. *Note: For security reasons, do not expose raw API keys in client-side code for production.*

#### Booking Form (Formspree)
1. Go to [Formspree](https://formspree.io/) and create a new form.
2. Copy your unique `FORM_ID`.
3. In `main.js`, update the booking form endpoint:
   ```javascript
   const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', { ... });
   ```

## 📂 Project Structure

- `index.html`: The homepage featuring a hero section, room previews, and testimonials.
- `rooms.html`: Detailed view of all room categories and pricing.
- `amenities.html`: Information about hotel facilities (WiFi, Power, Dining).
- `about.html`: The story and mission of Skado Hotel & Suites.
- `booking.html`: The reservation request form.
- `style.css`: Custom CSS containing the design system, variables, and responsive layouts.
- `main.js`: Main logic for navigation, animations, AI chatbot, and form handling.

## 📞 Contact Us

- **Address**: Oyo State, Nigeria
- **WhatsApp**: [+234 801 234 5678](https://wa.me/2348012345678)
- **Email**: [reservations@skadohotel.com](mailto:reservations@skadohotel.com)

---

© 2026 Skado Hotel & Suites. All rights reserved.
