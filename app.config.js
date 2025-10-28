import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

// tiny deterministic deep merge that preserves arrays from source
function isPlainObject(v) {
  return v && typeof v === "object" && !Array.isArray(v);
}

function deepMerge(target, source) {
  if (!isPlainObject(source)) return source;
  if (!isPlainObject(target)) target = {};

  const out = { ...target };
  for (const key of Object.keys(source)) {
    const s = source[key];
    const t = target[key];
    if (isPlainObject(s) && isPlainObject(t)) {
      out[key] = deepMerge(t, s);
    } else {
      // prefer source value (this lets app.config.js override app.json)
      out[key] = s;
    }
  }
  return out;
}

// read app.json safely; fallback to {} if missing
let base = {};
try {
  const raw = fs.readFileSync(path.resolve(process.cwd(), "app.json"), "utf8");
  base = JSON.parse(raw).expo || {};
} catch (e) {
  // no app.json — still fine, we'll produce a sane config
  base = {};
}

export default ({ config }) => {
  // Expo passes parsed config (from app.json) as `config` — keep it as a fallback source
  const incoming = (config && config.expo) || base;

  const googleKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY || "";

  if (!googleKey) {
    // be loud; silent failures are the enemy
    // eslint-disable-next-line no-console
    console.warn("Warning: EXPO_PUBLIC_GOOGLE_API_KEY is not set.");
  }

  const injection = {
    ios: {
      config: {
        googleMapsApiKey: googleKey,
      },
    },
    android: {
      config: {
        googleMaps: {
          apiKey: googleKey,
        },
      },
    },
    extra: {
      GOOGLE_MAPS_API_KEY: googleKey,
    },
  };

  const mergedExpo = deepMerge(incoming, injection);

  // return the full object shape Expo expects
  return {
    expo: mergedExpo,
  };
};
