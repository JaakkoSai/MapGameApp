import React, { useState, useEffect } from "react";
import { Button, Alert } from "react-native";
import MapView, { Polyline, Marker } from "react-native-maps";
import * as Location from "expo-location";
import { getDatabase, ref, push, set, onValue } from "firebase/database";
import { auth } from "../firebaseConfig";

export default function MapPage() {
  const [path, setPath] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const [locationSubscription, setLocationSubscription] = useState(null);

  useEffect(() => {
    // Request location permission
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Permission to access location was denied"
        );
        return;
      }
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
  }, [locationSubscription]);

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
        setCurrentLocation(newLocation); // Update current location state
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
    </>
  );
}
