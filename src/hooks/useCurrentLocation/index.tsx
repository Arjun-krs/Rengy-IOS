import { useState, useCallback } from "react"
import { Platform, PermissionsAndroid } from "react-native"
import Geolocation from "react-native-geolocation-service"

interface Location {
    latitude: number
    longitude: number
    address?: string
}

export const useCurrentLocation = () => {
    const [location, setLocation] = useState<Location | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const requestLocationPermission = useCallback(async () => {
        if (Platform.OS === "android") {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: "Location Permission",
                    message: "App needs access to your location",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK",
                }
            )
            return granted === PermissionsAndroid.RESULTS.GRANTED
        }
        return true
    }, [])

    const getAddressFromCoords = useCallback(async (lat: number, lng: number) => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`,
                {
                    headers: {
                        "User-Agent": "MyApp/1.0 (yourname@example.com)",
                        "Accept-Language": "en",
                    },
                }
            );

            const text = await response.text();
            if (text.trim().startsWith("<")) {
                return "";
            }

            const data = JSON.parse(text);
            const addressParts = [
                data?.address?.house_number || data?.address?.suburb,
                data?.address?.road || data?.address?.neighbourhood,
                data?.address?.city || data?.address?.town,
                data?.address?.state,
                data?.address?.country,
            ].filter(Boolean);

            return addressParts.join(", ") || data?.display_name || "";

        } catch (err) {
            console.error("Error fetching address:", err);
            return "";
        }
    }, []);


    const getLocation = useCallback(async (): Promise<Location | null> => {
        const hasPermission = await requestLocationPermission()
        if (!hasPermission) {
            setError("Location permission denied")
            return null
        }

        setLoading(true)

        return new Promise((resolve) => {
            Geolocation.getCurrentPosition(
                async (pos) => {
                    const { latitude, longitude } = pos.coords

                    const address = await getAddressFromCoords(latitude, longitude)
                    const newLocation = { latitude, longitude, address }

                    setLocation(newLocation)
                    setError(null)
                    setLoading(false)
                    resolve(newLocation)
                },
                (err) => {
                    console.error("Location error:", err)
                    setError(err.message)
                    setLoading(false)
                    resolve(null)
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            )
        })
    }, [getAddressFromCoords, requestLocationPermission])

    return { location, loading, error, getLocation }
}
