import "dotenv/config";

export default ({ config }) => {
  const envExtras = Object.keys(process.env)
    .filter((k) => k.startsWith("EXPO_PUBLIC_"))
    .reduce((acc, k) => {
      acc[k] = process.env[k];
      return acc;
    }, {});

  return {
    ...config,
    android: {
      ...config.android,
      config: {
        googleMaps: {
          apiKey: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
        },
      },
    },
    ios: {
      ...config.ios,
      config: {
        googleMapsApiKey: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
      },
    },
    extra: {
      ...(config.extra || {}),
      ...envExtras,
    },
  };
};
