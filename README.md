# Netflix Clone 2.0

A responsive, Netflix-inspired movie discovery app built with React. Browse trending movies and TV shows, watch trailers, and explore content by genre—all powered by The Movie Database (TMDB) API.

This project was built from scratch and later refined using Cursor AI to resolve issues, improve code quality, and add features that enhance the overall experience.

![Netflix Clone](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)
![TMDB API](https://img.shields.io/badge/TMDB-API-E50914)

## Screenshot

![Netflix Clone Screenshot](./screenshot.png)

---

## Features

- **Hero Banner** — Featured Netflix Originals with a random selection on each load; scales with viewport on large screens to prevent cropping
- **Genre Rows** — Horizontally scrollable rows: Netflix Originals, Trending, Top Rated, Boredom Busters, Action, Comedy, Horror, Romance, Documentary, Anime, Sci-Fi, Thriller
- **Landscape Thumbnails** — All thumbnails display in 16:9 landscape format at a uniform size for a consistent, filled layout
- **TMDB Logo Overlays** — Thumbnails display official studio logos when available (e.g. Baki-Dou, WWE RAW), with text fallback for titles without logos
- **Movie Detail Modal** — Click any title to view details, ratings, overview, and an embedded YouTube trailer
- **Custom Nav Avatar** — Personalized profile avatar in the navigation bar
- **Hover-to-Scroll Arrows** — Scroll arrows appear on row hover (no background), scale up on hover
- **Responsive Design** — Optimized for mobile, tablet, and desktop (320px to 1920px+)
- **Loading State** — Custom loader overlay during initial app load
- **PWA-Ready** — Web app manifest and meta tags for installability
- **Polished UI** — Rounded corners (4px) on thumbnails; viewport-scaled section titles (1.4vw)

---

## Tech Stack

| Technology | Purpose |
| ---------- | ------- |
| **React 18** | UI framework |
| **Axios** | HTTP client for TMDB API |
| **TMDB API** | Movie and TV show data |
| **movie-trailer** | YouTube trailer lookup |
| **react-youtube** | Embedded trailer playback |
| **Create React App** | Build tooling |

---

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/netflix-clone.git
   cd netflix-clone
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment**
   - Copy `.env.example` to `.env`
   - Get a free API key from [TMDB](https://www.themoviedb.org/settings/api)
   - Add it to `.env`:

     ```env
     REACT_APP_TMDB_API_KEY=your_api_key_here
     ```

4. **Run locally**

   ```bash
   npm start
   ```

   Open [http://localhost:3000](http://localhost:3000).

5. **Build for production**

   ```bash
   npm run build
   ```

---

## Firebase Hosting

This project is designed to be deployed with **Firebase Hosting**. Firebase Hosting is ideal for React single-page apps because it:

- **Serves static assets quickly** — Global CDN with automatic caching
- **Handles SPA routing** — Rewrites all routes to `index.html` so client-side routing works
- **Provides HTTPS by default** — Free SSL certificates
- **Integrates with CI/CD** — Easy deployment via GitHub Actions or Firebase CLI
- **Scales automatically** — No server management required

### Deploy to Firebase Hosting

1. **Install Firebase CLI**

   ```bash
   npm install -g firebase-tools
   ```

2. **Login and initialize**

   ```bash
   firebase login
   firebase init hosting
   ```

   When prompted:
   - Select "Use an existing project" or create one
   - Set the public directory to `build` (CRA output)
   - Configure as a single-page app: **Yes**
   - Do not overwrite `index.html`

3. **Build and deploy**

   ```bash
   npm run build
   firebase deploy
   ```

Your app will be live at `https://your-project-id.web.app`.

---

## Project Structure

```text
src/
├── App.js          # Main app, loader, movie selection state
├── App.css         # Global app styles
├── Banner.js       # Hero banner with featured content
├── Row.js          # Scrollable genre rows with logo overlays
├── MovieDetail.js  # Modal with trailer and details
├── Nav.js          # Top navigation bar with custom avatar
├── Footer.js       # Footer with attribution
├── requests.js     # TMDB API endpoints + getImagesUrl for logos
├── axios.js        # Axios instance with base URL
├── assets/         # Local images (e.g. avatar-img.png)
├── index.js        # Entry point
└── index.css       # Global styles
```

---

## License

This project is for educational purposes only. Movie data is provided by [The Movie Database (TMDB)](https://www.themoviedb.org/). Netflix branding and assets are trademarks of Netflix, Inc.
