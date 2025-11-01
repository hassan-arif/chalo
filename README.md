<p align='center'>
  <img src='assets/images/icon.png' alt='Chalo Logo' width='200px'/>
</p>

# Chalo

## Log

1. Build the foundation: initialize an Expo React Native app, connect a Neon Postgres database, install NativeWind for styling, configure Tailwind, add ESLint and Prettier for clean code, and fix Node version issues for stable builds.
2. Remove Expo boilerplate you don’t need, add a minimal file-based routing structure (onboarding + tabs), wire assets & fonts.
3. Three-screen onboarding with swipe + dots, skip/next logic, assets-driven data (constants), and a reusable CustomButton.
4. Sign-up/sign-in screens: scrollable forms using KeyboardAvoidingView + TouchableWithoutFeedback, a reusable InputField and custom buttons — wired with useState form handling and placeholder async handlers.
5. Wire Clerk email auth into the app, then implement useSignUp / useSignIn flows in signup/signin screens including email verification modals and success modal handling.
6. Adds a custom bottom tab bar (Tabs from expo-router) with four screens — Home, Rides, Chat and Profile.
7. Add Neon Postgres (serverless driver) + Expo API routes so the app can create/read users server-side. Create a [user](</app/(api)/user+api.ts>) POST route that uses `@neondatabase/serverless` to run raw SQL, add a small fetch helper and the users table SQL.
8. Build the Home screen UI: List of recent rides, a reusable RideCard that shows a static map image (Geoapify), utility date formatting, and a GoogleTextInput placeholder for destination search.
9. Add an interactive Map component.
10. Add a Google Places autocomplete input using react-native-google-places-autocomplete.
11. Implement a reusable RideLayout (map + gorhom bottom sheet + back button) and the find-ride screen that uses it with two GoogleTextInput fields (From / To) and a Find Now button which pushes to confirm-ride
12. Create the Confirm Ride screen using the existing RideLayout: render a FlatList of drivers (mocked for now), wire it to a driver store (zustand) and make each card selectable. Add a footer button that pushes to the booking route.
13. Add the final Book Ride screen that reads the selected driver from the driver store, shows driver & trip details inside RideLayout and adds a Payment component.
14. Integrate Stripe Payment Sheet. Add drivers table in neonDb and fetch default drivers from there. Integrate logic to calculate time/amount from marker data.
15. Add path from source to destination address. Add new ride in neonDb.
16. Replaced mock recent rides with dynamic rides fetched per logged-in user.

## Technologies

1. NativeWind: Style using Tailwind CSS
2. Lint/Prettier: Catching bad/error code and fix how it looks
3. react-native-swiper: Carousel gestures on Onboarding screens
4. Clerk: Email authentication (with OTP)
5. react-native-modal: Customizable modal
6. Neon: Postgres database
7. [Geoapify](https://www.geoapify.com/): Maps service
8. [react-native-maps](https://docs.expo.dev/versions/latest/sdk/map-view/), react-native-maps-directions: Interactive Map component
9. Zustand: Store
10. react-native-google-places-autocomplete
11. @gorhom/bottom-sheet
12. Stripe

## Schema

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

## How to Run (Android)

### Debug

```bash
yarn install
npx expo prebuild --platform android --clean
cd android
./gradlew clean
cd ..
adb uninstall com.hassanarifmahmood.Chalo
yarn android
```

### Release

```bash
cd android
./gradlew app:assembleRelease
# or: ./gradlew app:bundleRelease
```

## References & Credits

- Base setup inspired by [JavaScript Mastery](https://youtu.be/kmy_YNhl0mw?si=kXQ-1q0jWEEIamWN)
