import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUserData } from "../api/slice/authSlice";

const useFetchUserData = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state: any) => state?.auth);

    useEffect(() => {
        const fetchRole = async () => {
            try {
                const stores = await AsyncStorage.multiGet(["user", "accessToken", "refreshToken"]);
                const data: Record<string, string | null> = {};
                stores?.forEach(([key, value]) => { data[key] = value; });
                if (data?.user) {
                    dispatch(setUserData({ user: JSON.parse(data?.user), accessToken: data?.accessToken, refreshToken: data?.refreshToken }));
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchRole();
    }, [dispatch]);

    return { user };
};

export default useFetchUserData;
