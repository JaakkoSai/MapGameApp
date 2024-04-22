import React, { useState, useEffect } from "react";
import { Button } from "react-native";
import MapView, { Polyline } from "react-native-maps";
import * as Location from "expo-location";
import { getDatabase, ref, push, set } from "firebase/database";

export default function MapPage() {
  const [path, setPath] = useState([]);
  const [isTracking, setIsTracking] = useState(false);
  const [locationSubscription, setLocationSubscription] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }
    })();
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
      }
    );
    setLocationSubscription(subscription);
  };

  const stopTracking = () => {
    locationSubscription?.remove();
    setIsTracking(false);
    setLocationSubscription(null);

    const db = getDatabase();
    const pathRef = ref(db, "/paths");
    const newPathRef = push(pathRef);

    // Correct use of set
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
      <MapView style={{ flex: 1 }}>
        <Polyline
          testID="polyline"
          coordinates={path}
          strokeColor="#000"
          strokeWidth={3}
        />
      </MapView>
      {!isTracking ? (
        <Button title="Start Tracking" onPress={startTracking} />
      ) : (
        <Button title="Stop Tracking" onPress={stopTracking} />
      )}
    </>
  );
}
