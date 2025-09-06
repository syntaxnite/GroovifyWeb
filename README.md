# Groovify

Groovify is a web application that enhances your Spotify experience by allowing you to connect with your Spotify account and explore your music in new ways.

## Features

- Spotify OAuth authentication
- Clean, modern UI with Tailwind CSS
- Built with Next.js App Router and TypeScript
- Multiple theme options (Dark, Light, and Cream)
- Customizable user interface
- Embedded vector logo (no external image files needed)

## Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- A Spotify Developer account

### Setup

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up your Spotify Developer credentials:
   - Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/)
   - Create a new application
   - Add the following Redirect URIs:
     - For development: `http://localhost:3000/api/auth/callback/spotify`
     - For production: `https://your-production-domain.com/api/auth/callback/spotify`
   - Copy your Client ID and Client Secret

4. Configure environment variables:
   - Rename `.env.local` to `.env.local`
   - Update the following variables:
     ```
     SPOTIFY_CLIENT_ID=your_spotify_client_id
     SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
     NEXTAUTH_SECRET=a_random_string_for_security
     NEXTAUTH_URL=http://localhost:3000
     ```

5. Run the development server:
   ```
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `/src/app` - Next.js App Router pages and API routes
- `/src/components` - Reusable React components
- `/src/context` - React context providers for state management
- `/src/types` - TypeScript type definitions
- `/public` - Static files and images

## Authentication Flow

The application uses NextAuth.js to handle Spotify OAuth authentication with enhanced security. The flow is as follows:

1. User clicks the "Login with Spotify" button
2. User is redirected to Spotify's login page with PKCE and state parameter protection
3. After successful login, Spotify redirects back to our application
4. The secure callback validates the request and establishes a session
5. The user is now authenticated and can access their Spotify data

Authentication includes multiple security measures:
- PKCE (Proof Key for Code Exchange) protection
- CSRF state parameter validation
- Secure HTTP-only cookies
- Error handling with custom error pages

## Theme Switching

Groovify supports multiple themes:

1. **Dark Theme**: A sleek dark interface with Spotify-inspired colors
2. **Light Theme**: A clean, bright interface for daytime use
3. **Cream Theme**: A warm, eye-friendly alternative

You can switch between themes using the theme toggle button in the top-right corner of the application.

## Logo Customization

The Groovify logo is implemented as an inline SVG component, which means:
- No external image files are required
- The logo scales perfectly at any size
- It works with theme changes automatically
- You can easily modify it by editing the `GroovifyLogo.tsx` component

To customize the logo, edit the `src/components/GroovifyLogo.tsx` file and modify the SVG elements.

## License

This project is licensed under the MIT License.
