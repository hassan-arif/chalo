import { icons } from "@/constants";
import { useFetch } from "@/lib/fetch";
import {
  calculateDriverTimes,
  calculateRegion,
  generateMarkersFromData,
} from "@/lib/map";
import { useDriverStore, useLocationStore } from "@/store";
import { Driver, MarkerData } from "@/types/type";
import Constants from "expo-constants";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Platform, Text, View } from "react-native";

// Only import MapView on native
let MapView: any = null;
let Marker: any = null;
let MapViewDirections: any = null;
let PROVIDER_DEFAULT: any = null;
let RegionType: any = null;

if (Platform.OS !== "web") {
  const rnMaps = require("react-native-maps");
  MapView = rnMaps.default;
  Marker = rnMaps.Marker;
  PROVIDER_DEFAULT = rnMaps.PROVIDER_DEFAULT;
  RegionType = rnMaps.Region;
  MapViewDirections = require("react-native-maps-directions").default;
}

const Map = () => {
  const {
    data: drivers,
    loading,
    error,
  } = useFetch<Driver[]>("/(api)/driver", { method: "GET" });
  const {
    userLongitude,
    userLatitude,
    destinationLongitude,
    destinationLatitude,
  } = useLocationStore();
  const { selectedDriver, setDrivers } = useDriverStore();
  const [markers, setMarkers] = useState<MarkerData[]>([]);

  const region = calculateRegion({
    userLongitude,
    userLatitude,
    destinationLatitude,
    destinationLongitude,
  }) as typeof RegionType;

  const mapRef = useRef<any>(null);

  // Animate on region change
  useEffect(() => {
    if (!mapRef.current) return;
    if (userLatitude != null && userLongitude != null) {
      mapRef.current.animateToRegion(region, 500);
    }
  }, [userLatitude, userLongitude, destinationLatitude, destinationLongitude]);

  useEffect(() => {
    if (Array.isArray(drivers)) {
      if (!userLatitude || !userLongitude) return;

      const newMarkers = generateMarkersFromData({
        data: drivers,
        userLatitude,
        userLongitude,
      });
      setMarkers(newMarkers);
    }
  }, [drivers, userLatitude, userLongitude]);

  useEffect(() => {
    if (markers.length && destinationLatitude && destinationLongitude) {
      calculateDriverTimes({
        markers,
        userLatitude,
        userLongitude,
        destinationLatitude,
        destinationLongitude,
      }).then((drivers) => setDrivers(drivers as MarkerData[]));
    }
  }, [markers, destinationLatitude, destinationLongitude]);

  // Web fallback
  if (Platform.OS === "web") {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Map is not available on web</Text>
      </View>
    );
  }

  if (loading || !userLatitude || !userLongitude) {
    return (
      <View className="flex justify-center items-center w-full h-full">
        <ActivityIndicator size="small" color="#000" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex justify-center items-center w-full h-full">
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <MapView
      ref={mapRef}
      provider={PROVIDER_DEFAULT}
      style={{ width: "100%", height: "100%" }}
      mapType="standard"
      showsPointsOfInterest={false}
      initialRegion={region}
      showsUserLocation={true}
      userInterfaceStyle="light"
    >
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
          title={marker.title}
          image={
            selectedDriver === marker.id ? icons.selectedMarker : icons.marker
          }
        />
      ))}

      {destinationLatitude && destinationLongitude && (
        <>
          <Marker
            key="destination"
            coordinate={{
              latitude: destinationLatitude,
              longitude: destinationLongitude,
            }}
            title="Destination"
            image={icons.pin}
          />

          <MapViewDirections
            origin={{
              latitude: userLatitude!,
              longitude: userLongitude!,
            }}
            destination={{
              latitude: destinationLatitude!,
              longitude: destinationLongitude!,
            }}
            apikey={Constants.expoConfig?.extra?.EXPO_PUBLIC_GOOGLE_API_KEY!}
            strokeColor="#0286ff"
            strokeWidth={3}
          />
        </>
      )}
    </MapView>
  );
};

export default Map;
