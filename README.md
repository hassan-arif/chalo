<p align='center'>
  <img src='assets/images/icon.png' alt='Chalo Logo' width='200px'/>
</p>

# Chalo

## Log

1. Build the foundation: initialize an Expo React Native app, connect a Neon Postgres database, install NativeWind for styling, configure Tailwind, add ESLint and Prettier for clean code, and fix Node version issues for stable builds.
2. Remove Expo boilerplate you don’t need, add a minimal file-based routing structure (onboarding + tabs), wire assets & fonts.

## Technologies

1. NativeWind: Style using Tailwind CSS
2. Lint/Prettier: Catching bad/error code and fix how it looks

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
