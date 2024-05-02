import React, { useState, useEffect } from "react";
import { Button, Alert, Text, View } from "react-native";
import MapView, { Polyline, Marker } from "react-native-maps";
import * as Location from "expo-location";
import { getDatabase, ref, push, set, onValue } from "firebase/database";
import { auth } from "../firebaseConfig";
import axios from "axios";

export default function MapPage() {
  const [path, setPath] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const [locationSubscription, setLocationSubscription] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Permission to access location was denied"
        );
        return;
      }

      // Fetch weather data whenever the location changes
      locationSubscription && fetchWeather(currentLocation);
    })();

    // Fetch stored paths if user is logged in
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const db = getDatabase();
      const userPathRef = ref(db, `users/${userId}/paths`);
      onValue(userPathRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const allPaths = [];
          Object.keys(data).forEach((key) => {
            allPaths.push(...data[key]);
          });
          setPath(allPaths);
        }
      });
    }
    return () => {
      locationSubscription?.remove();
    };
  }, [locationSubscription, currentLocation]);

  const fetchWeather = (location) => {
    if (!location) return;
    const owmapikey = process.env.EXPO_PUBLIC_OWM_API_KEY;
    const owmurl = `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${owmapikey}&units=metric`;

    axios
      .get(owmurl)
      .then((response) => {
        setWeather(response.data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  };

  const startTracking = async () => {
    setIsTracking(true);
    const subscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
        timeInterval: 1000,
        distanceInterval: 5,
      },
      (locationUpdate) => {
        const newLocation = {
          latitude: locationUpdate.coords.latitude,
          longitude: locationUpdate.coords.longitude,
        };
        setPath((currentPath) => [...currentPath, newLocation]);
        setCurrentLocation(newLocation);
        fetchWeather(newLocation);
      }
    );
    setLocationSubscription(subscription);
  };

  const stopTracking = () => {
    locationSubscription?.remove();
    setIsTracking(false);
    setLocationSubscription(null);

    const userId = auth.currentUser.uid;

    if (!userId) {
      console.error("No user logged in");
      return;
    }

    const db = getDatabase();
    const userPathRef = ref(db, `users/${userId}/paths`);
    const newPathRef = push(userPathRef);

    set(newPathRef, path)
      .then(() => {
        console.log("Path saved successfully!");
      })
      .catch((error) => {
        console.error("Error saving path: ", error);
      });
  };

  return (
    <>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: currentLocation?.latitude || 60.192059,
          longitude: currentLocation?.longitude || 24.945831,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Polyline
          testID="polyline"
          coordinates={path}
          strokeColor="#000"
          strokeWidth={3}
        />
        {currentLocation && (
          <Marker coordinate={currentLocation} title="Your Location" />
        )}
      </MapView>
      {!isTracking ? (
        <Button title="Start Tracking" onPress={startTracking} />
      ) : (
        <Button title="Stop Tracking" onPress={stopTracking} />
      )}
      {weather && (
        <View style={{ padding: 20, backgroundColor: "white" }}>
          <Text>Temperature: {weather.main.temp}°C</Text>
          <Text>Weather: {weather.weather[0].description}</Text>
        </View>
      )}
    </>
  );
}
