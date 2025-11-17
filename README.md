<p align="center">
  <img src="assets/images/adaptive-icon.png" alt="Chalo Logo" width="200px"/>
  <h1>Chalo</h1>
</p>

<p align="center">
  <img src="https://img.shields.io/github/license/hassanarifmahmood/chalo?color=brightgreen" />
  <img src="https://img.shields.io/github/stars/hassanarifmahmood/chalo?style=social" />
  <img src="https://img.shields.io/badge/Expo-React%20Native-blue" />
  <img src="https://img.shields.io/badge/Database-Neon%20Postgres-orange" />
  <img src="https://img.shields.io/badge/Auth-Clerk-red" />
  <img src="https://img.shields.io/badge/Payments-Stripe-purple" />
</p>

Chalo is a full-stack ride-hailing application built with Expo, React Native, Neon Postgres, Clerk authentication, and Stripe payments.  
It recreates a complete mobility experience: onboarding, authentication, maps, location search, routing, driver selection, ride booking, and payments.

---

## Features

**Authentication**

- Email OTP and Google OAuth via Clerk
- Automatic user creation in Neon

**Ride Flow**

- Interactive map with react-native-maps
- Google Places Autocomplete
- Route rendering and travel-time estimation
- Driver selection with custom bottom sheet
- Stripe Payment Sheet integration
- Dynamic ride creation and ride history per user

**UI**

- Three-screen onboarding carousel
- Custom tab bar: Home, Rides, Chat, Profile
- Reusable RideLayout for map-driven screens
- Tailwind-based styling via NativeWind

**Backend**

- Expo API routes
- Neon Postgres (serverless)
- Direct SQL execution through `@neondatabase/serverless`

---

## Development Highlights

- Set up Expo, Tailwind (NativeWind), ESLint/Prettier, and routing with expo-router.
- Built onboarding with swipe gestures and indicator dots.
- Implemented sign-in and sign-up forms with reusable input components.
- Integrated Clerk email + Google OAuth flow with verification modals.
- Added tab navigation and core screens: Home, Rides, Chat, Profile.
- Connected Neon Postgres using Expo API routes and raw SQL.
- Built Home UI with RideCards, Geoapify map snapshots, and dynamic ride data.
- Added an interactive map and Google Places Autocomplete fields.
- Created find-ride, confirm-ride, and book-ride screens using Zustand state and shared RideLayout.
- Added Stripe Payment Sheet and logic for fare/time calculation.
- Implemented route polyline drawing and complete ride creation.
- Finished All Rides and Profile screens with dynamic user data.

---

## Tech Stack

- Expo / React Native
- NativeWind (Tailwind CSS)
- Clerk (Email OTP + Google OAuth)
- Neon (Serverless Postgres)
- Stripe
- react-native-maps / Directions
- Geoapify
- Zustand
- Gorhom Bottom Sheet
- Google Places Autocomplete

---

## Database Schema

### Users

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  clerk_id VARCHAR(50) UNIQUE NOT NULL
);
```

### Rides

```sql
CREATE TABLE rides (
  ride_id SERIAL PRIMARY KEY,
  origin_address VARCHAR(255) NOT NULL,
  destination_address VARCHAR(255) NOT NULL,
  origin_latitude DECIMAL(9, 6) NOT NULL,
  origin_longitude DECIMAL(9, 6) NOT NULL,
  destination_latitude DECIMAL(9, 6) NOT NULL,
  destination_longitude DECIMAL(9, 6) NOT NULL,
  ride_time INTEGER NOT NULL,
  fare_price DECIMAL(10, 2) NOT NULL CHECK (fare_price >= 0),
  payment_status VARCHAR(20) NOT NULL,
  driver_id INTEGER REFERENCES drivers(id),
  user_id VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Drivers

```sql
CREATE TABLE drivers (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  profile_image_url TEXT,
  car_image_url TEXT,
  car_seats INTEGER NOT NULL CHECK (car_seats > 0),
  rating DECIMAL(3, 2) CHECK (rating >= 0 AND rating <= 5)
);
```

---

## Running on Android

### Debug

```bash
yarn install
npx expo prebuild --platform android --clean
cd android && ./gradlew clean && cd ..
adb uninstall com.hassanarifmahmood.Chalo
yarn android
```

### Release

```bash
cd android
./gradlew app:assembleRelease
# or
./gradlew app:bundleRelease
```

---

## Credits

Initial setup inspired by [JavaScript Mastery](https://youtu.be/kmy_YNhl0mw?si=6En9GUgQeHpeP8Lk).
