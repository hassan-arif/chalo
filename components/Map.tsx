import React from "react";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";

const Map = () => {
  // const region = {}

  return (
    <MapView
      provider={PROVIDER_DEFAULT}
      style={{ width: "100%", height: 250 }}
      tintColor="black"
      mapType="hybrid"
      showsPointsOfInterest={false}
      // initialRegion={region}
      showsUserLocation={true}
      userInterfaceStyle="light"
    />
  );
};

export default Map;
