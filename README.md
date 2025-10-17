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

## Technologies

1. NativeWind: Style using Tailwind CSS
2. Lint/Prettier: Catching bad/error code and fix how it looks
3. react-native-swiper: Carousel gestures on Onboarding screens
4. Clerk: Email authentication (with OTP)
5. react-native-modal: Customizable modal
6. Neon: Postgres database
7. [Geoapify](https://www.geoapify.com/): Maps service

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
