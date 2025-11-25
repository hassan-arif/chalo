import { icons } from "@/constants";
import { GoogleInputProps } from "@/types/type";
import Constants from "expo-constants";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const GoogleTextInput = ({
  icon,
  initialLocation,
  containerStyle,
  textInputBackgroundColor,
  handlePress,
}: GoogleInputProps) => {
  return (
    <View
      className={`flex flex-row items-center justify-center relative z-50 rounded-xl ${containerStyle} mb-5`}
    >
      <GooglePlacesAutocomplete
        placeholder="Where you want to go?"
        fetchDetails={true}
        debounce={200}
        styles={{
          textInputContainer: {
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 20,
            marginHorizontal: 20,
            position: "relative",
            shadowColor: "#d4d4d4",
          },
          textInput: {
            backgroundColor: textInputBackgroundColor || "white",
            fontSize: 16,
            fontWeight: "600",
            marginTop: 5,
            width: "100%",
            borderRadius: 200,
          },
          listView: {
            backgroundColor: textInputBackgroundColor || "white",
            position: "relative",
            top: 0,
            width: "100%",
            borderRadius: 10,
            shadowColor: "#d4d4d4",
            zIndex: 99,
          },
        }}
        onPress={(data, details = null) => {
          handlePress({
            latitude: details?.geometry.location.lat!,
            longitude: details?.geometry.location.lng!,
            address: data.description,
          });
        }}
        renderLeftButton={() => (
          <View className="justify-center items-center w-6 h-6">
            <Image
              source={icon ? icon : icons.search}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </View>
        )}
        textInputProps={{
          placeholderTextColor: "gray",
          placeholder: initialLocation ?? "Where do you want to go?",
        }}
        predefinedPlaces={[]}
        minLength={0}
        timeout={20000}
        keyboardShouldPersistTaps="handled"
        query={{
          key: Constants.expoConfig?.extra?.EXPO_PUBLIC_GOOGLE_API_KEY,
          language: "en",
        }}
        // enablePoweredByContainer={false}
        // autoFillOnNotFound={false}
        // currentLocation={false}
        // currentLocationLabel="Current location"
        // disableScroll={false}
        // enableHighAccuracyLocation={true}
        // filterReverseGeocodingByTypes={[]}
        // GooglePlacesDetailsQuery={{}}
        // GooglePlacesSearchQuery={{
        //   rankby: "distance",
        //   type: "restaurant",
        // }}
        // GoogleReverseGeocodingQuery={{}}
        // isRowScrollable={true}
        // listHoverColor="#ececec"
        // listUnderlayColor="#c8c7cc"
        // listViewDisplayed="auto"
        // keepResultsAfterBlur={false}
        // nearbyPlacesAPI="GooglePlacesSearch"
        // numberOfLines={1}
        // onFail={(e) => {
        //   console.warn("Google Place Failed : ", e);
        // }}
        // onNotFound={() => {}}
        // onTimeout={() =>
        //   console.warn("google places autocomplete: request timeout")
        // }
        // predefinedPlacesAlwaysVisible={false}
        // suppressDefaultStyles={false}
        // textInputHide={false}
        // isNewPlacesAPI={false}
        // fields="*"
      />
    </View>
  );
};

export default GoogleTextInput;

const styles = StyleSheet.create({});
